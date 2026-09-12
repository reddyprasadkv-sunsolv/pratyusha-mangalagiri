import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';

function setup({ failFlush = false } = {}) {
  const rows = [];
  let flushes = 0;
  const sheet = {
    getLastRow: () => rows.length,
    setFrozenRows() {},
    getRange(row, column, count) {
      return {
        setValues(values) {
          values.forEach((value, i) => {
            rows[row - 1 + i] = value;
          });
          return this;
        },
        getValues: () => rows.slice(row - 1, row - 1 + count),
        setNumberFormat() {
          return this;
        },
        setBackground() {
          return this;
        },
        setFontColor() {
          return this;
        },
        setFontWeight() {
          return this;
        },
        createTextFinder(id) {
          return {
            matchEntireCell() {
              return this;
            },
            useRegularExpression() {
              return this;
            },
            findNext: () => rows.slice(1).some((value) => value[0] === id),
          };
        },
      };
    },
  };
  const context = vm.createContext({
    SpreadsheetApp: {
      openById: () => ({ getSheetByName: () => sheet }),
      flush() {
        if (failFlush) throw new Error('write failed');
        flushes++;
      },
    },
    LockService: {
      getScriptLock: () => ({ waitLock() {}, hasLock: () => true, releaseLock() {} }),
    },
    ContentService: {
      MimeType: { JSON: 'application/json' },
      createTextOutput: (text) => ({ setMimeType: () => JSON.parse(text) }),
    },
  });
  vm.runInContext(readFileSync(new URL('./Code.gs', import.meta.url), 'utf8'), context);
  return {
    rows,
    context,
    flushes: () => flushes,
    post: (lead) => context.doPost({ postData: { contents: JSON.stringify(lead) } }),
  };
}
const lead = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  fullName: 'Integration Test',
  mobileNumber: '9876543210',
  emailAddress: '',
  city: '',
  message: '=1+1',
  requirementKey: 'success',
  preferredLanguage: 'en',
  consentGiven: true,
};
test('confirms only after flushing, stores safe text, and deduplicates retries', () => {
  const app = setup();
  assert.equal(app.post(lead).ok, true);
  assert.equal(app.flushes(), 1);
  assert.equal(app.rows[1][8], "'=1+1");
  assert.equal(app.post(lead).id, lead.id);
  assert.equal(app.rows.length, 2);
});
test('failed writes return no success acknowledgement', () => {
  assert.equal(setup({ failFlush: true }).post(lead).ok, false);
});
test('invalid submissions never write rows', () => {
  const app = setup();
  for (const bad of [
    null,
    {},
    { ...lead, consentGiven: false },
    { ...lead, mobileNumber: 'bad' },
    { ...lead, message: 'x'.repeat(1001) },
  ]) {
    assert.equal(app.post(bad).ok, false);
  }
  assert.equal(app.rows.length, 0);
});
