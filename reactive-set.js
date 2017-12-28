// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See reactive-set-tests.js for an example of importing.
export const name = 'reactive-set';

export const ReactiveSet = function (value) {
    check(value, Match.Optional(Set));

    this._set = value || new Set();

    this._dep = new Tracker.Dependency;
};


ReactiveSet.prototype.get = function() {
    if (Tracker.active) {
        this._dep.depend();
    }
    return this._set;
};

ReactiveSet.prototype.has = function(elem) {
    if (Tracker.active) {
        this._dep.depend();
    }
    return this._set.has(elem);
};

ReactiveSet.prototype.set = function(set) {
    check(set, Match.Optional(Set));
    if (!_.isEqual(set, this._set)) {
        this._set = set;
        this._dep.changed();
    }
};

ReactiveSet.prototype.add = function(elem) {
    if (!this._set.has(elem)) {
        this._set.add(elem);
        this._dep.changed();
    }
};