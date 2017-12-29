/**
 *
 * @param value
 * @constructor
 */
export const ReactiveSet = function (value) {
    check(value, Match.Optional(Set));

    this._set = value || new Set();

    this._dependend_methods = ['has', 'entries', 'forEach', 'keys', 'values'];

    this._changing_methods = ['add', 'clear', 'delete'];

    this._dep = new Tracker.Dependency;

    for(let i=0;i<=this._changing_methods.length; i++){
        this._addWrappedPrototypeChangingMethod(this._changing_methods[i]);
    }
    for(let i=0;i<=this._dependend_methods.length; i++){
        this._addWrappedPrototypeDependentMethod(this._dependend_methods[i]);
    }
};

ReactiveSet.prototype = {
    get size() {
        if (Tracker.active) {
            this._dep.depend();
        }
        return this._set.size;
    }
};

ReactiveSet.prototype._addWrappedPrototypeChangingMethod = function(method) {
    let self = this;
    this[method] = function() {
        console.log(arguments);
        if(
            ( method === 'add'    && !self._set.has(arguments[0]) ) || // add not existing
            ( method === 'delete' &&  self._set.has(arguments[0]) ) || // remove existing
            ( method === 'clear'  &&  self._set.size > 0 )          // clear not empty
        ) { self._dep.changed(); }
        return Set.prototype[method].apply(self._set, arguments);
    };
};

ReactiveSet.prototype._addWrappedPrototypeDependentMethod = function(method) {
    let self = this;
    this[method] = function() {
        if (Tracker.active) {
            self._dep.depend();
        }
        return Set.prototype[method].apply(self._set, arguments);
    };
};

ReactiveSet.prototype.get = function() {
    if (Tracker.active) {
        this._dep.depend();
    }
    return this._set;
};

// ReactiveSet.prototype.has = function(elem) {
//     if (Tracker.active) {
//         this._dep.depend();
//     }
//     return this._set.has(elem);
// };

ReactiveSet.prototype.set = function(set) {
    check(set, Match.Optional(Set));
    if (!_.isEqual(set, this._set)) {
        this._set = set;
        this._dep.changed();
    }
};

// ReactiveSet.prototype.add = function(elem) {
//     if (!this._set.has(elem)) {
//         this._set.add(elem);
//         this._dep.changed();
//     }
// };

ReactiveSet.prototype.constructor = ReactiveSet;