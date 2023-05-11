function useDb(initializer = []) {
  this.db = initializer;
  this.res = {
    msg: undefined,
    status: undefined,
    err: undefined,
  };
  this.id = 1;
  this.statics = {
    formatDate: (input) => {
      return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "long",
        timeZone: "Asia/Karachi",
      }).format(input);
    },
    find: (input) => {
      const id = parseInt(input);
      if (isNaN(id)) {
        return {
          ...this.res,
          msg: "Provided value should be of Number type",
          status: "FAILED",
          error: 000,
        };
      }
      const found = this.db.find((item) => item.id === id);
      if (!found) {
        return {
          ...this.res,
          msg: "Value not found",
          status: "FAILED",
          err: 444,
        };
      }
      return found;
    },
  };

  return {
    getAll: () => {
      return this.db;
    },
    addEntry: (input) => {
      if (typeof input !== "object" || input.length) {
        return {
          ...this.res,
          msg: "Provided data should be of type Object",
          err: 000,
          status: "FAILED",
        };
      }

      const id = this.id;
      const createdAt = this.statics.formatDate(Date.now());
      const added = this.db.push({ ...input, id, createdAt });
      this.id++;
      return added;
    },
    findEntry: (input) => {
      const found = this.statics.find(input);
      return found;
    },
    deleteEntry: (input) => {
      const id = parseInt(input);
      if (isNaN(id)) {
        return {
          ...this.res,
          msg: "Provided value should be of Number type",
          err: 444,
          status: "FAILED",
        };
      }

      const found = this.db.find((item) => item.id === id);
      if (!found) {
        return {
          ...this.res,
          msg: "Provided ID doesn't exist",
          err: 444,
          status: "FAILED",
        };
      }
      const foundIndex = this.db.indexOf(found);
      const deleted = this.db.splice(foundIndex, 1);
      return deleted;
    },
  };
}

module.exports = useDb;
