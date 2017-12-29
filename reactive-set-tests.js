// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";
import { Tracker } from 'meteor/tracker';

// Import and rename a variable exported by reactive-set.js.
import { ReactiveSet } from "meteor/gustawdaniel:reactive-set";

// Write your tests here!
// Here is an example.
Tinytest.add('reactive-set - has working methods: add, has', function (test) {
    let set = new ReactiveSet();
    set.add(5);
    test.equal(set.has(5), true);
});

Tinytest.add('reactive-set - is reactive in get if add is called', function (test) {
    let set = new ReactiveSet();

    let counter = -1; // we start from -1 because of first run in not connected with changes

    Tracker.autorun(function () {
        set.get();
        counter++;  // first run always set counter to 0
    });

    set.add(5); // this should increment counter again

    Tracker.flush();
    test.equal(counter, 1);
});

Tinytest.add('reactive-set - properties size and constructor', function (test) {
    let set = new ReactiveSet();
    set.add(5);

    test.equal(set.size, 1);
    test.equal(typeof set.constructor, 'function');
});

Tinytest.add('reactive-set - clear twice times should induce one refresh', function (test) {
    let set = new ReactiveSet(new Set([5]));

    let counter = -1;

    Tracker.autorun(function () {
        set.get();
        counter++;
    });

    set.clear();     // i call two times flush
    Tracker.flush();

    set.clear();     // but second should not allow to recalculate because of changes are not detected
    Tracker.flush();



    test.equal(counter, 1);
});

Tinytest.add('reactive-set - deleting twh different elements should recalculate two times', function (test) {
    let set = new ReactiveSet(new Set(['a','b','c']));

    let counter = -1;

    Tracker.autorun(function () {
        set.get();
        counter++;
    });

    set.delete('a');     // i call two times flush
    Tracker.flush();

    set.delete('b');     // but second should not allow to recalculate because of changes are not detected
    Tracker.flush();

    test.equal(counter, 2);
    test.equal(set.has('c'), true);
});