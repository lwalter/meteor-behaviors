describe('Behaviors', function () {
  describe('applies the createdAt behavior', function () {
    it('assigns a date on insert', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.createdAt(Tests, 'createdAt');

      var testId = Tests.insert({ text: 'Test text' });
      var test = Tests.findOne({ _id: testId });
      expect(test.createdAt).toBeDefined();
    });
  });

  describe('applies the updatedAt behavior', function () {
    it('assigns a date on update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updatedAt(Tests, 'updatedAt');

      var testId = Tests.insert({ text: 'Test text' });
      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Updated text'
          }
        });

      var test = Tests.findOne({ _id: testId });
      expect(test.updatedAt).toBeDefined();
    });
  });

  describe('applies the updateAtHistory behavior', function () {
    it('assigns a date on update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updateAtHistory(Tests, 'updateAtHistory');

      var testId = Tests.insert({ text: 'Test text' });

      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Updated text'
          }
        });

      var test = Tests.findOne({ _id: testId });
      expect(test.updateAtHistory).toBeDefined();
      expect(test.updateAtHistory.length).toEqual(1);
    });

    it('appends a date on subsequent update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updateAtHistory(Tests, 'updateAtHistory');
      var testId = Tests.insert({ text: 'Test text' });

      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Updated text'
          }
        });

      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Another update'
          }
        });

      var test = Tests.findOne({ _id: testId });
      expect(test.updateAtHistory).toBeDefined();
      expect(test.updateAtHistory.length).toEqual(2);
    });
  });

  describe('applies the createdBy behavior', function () {
    it('assigns userId on insert', function () {
      var Tests = new Mongo.Collection('test');
      Behaviors.createdBy(Tests, 'createdBy');

      var testId = Tests.insert({ text: 'Test text' });

      var test = Tests.findOne({ _id: testId });
      expect(test.createdBy).toBeDefined();
    });
  });

  describe('applies the updatedBy behavior', function () {
    it('assigns userId on update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updatedBy(Tests, 'updatedBy');

      var testId = Tests.insert({ text: 'Test text' });
      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Updated text'
          }
        });

      var test = Tests.findOne({ _id: testId });
      expect(test.updatedBy).toBeDefined();
    });
  });

  describe('applies the updateByHistory behavior', function () {
    it('assigns a user id on update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updateByHistory(Tests, 'updateByHistory');

      var testId = Tests.insert({ text: 'Test text' });

      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Updated text'
          }
        });

      var test = Tests.findOne({ _id: testId });
      expect(test.updateByHistory).toBeDefined();
      expect(test.updateByHistory.length).toEqual(1);
    });

    it('appends a user id on subsequent update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updateByHistory(Tests, 'updateByHistory');
      var testId = Tests.insert({ text: 'Test text' });

      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Updated text'
          }
        });

      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Another update'
          }
        });

      var test = Tests.findOne({ _id: testId });
      expect(test.updateByHistory).toBeDefined();
      expect(test.updateByHistory.length).toEqual(2);
    });
  });

  describe('applies multiple behaviors', function () {
    it('same-hook behaviors respected', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.createdBy(Tests, 'createdBy');
      Behaviors.createdAt(Tests, 'createdAt');
      var testId = Tests.insert({ text: 'Test text' });

      var test = Tests.findOne({ _id: testId });
      expect(test.createdBy).toBeDefined();
      expect(test.createdAt).toBeDefined();
    });
  });
});
