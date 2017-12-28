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
    set.add(5);

    let counter = 0;

    Tracker.autorun(function () {
        set.get();
        counter++;
    });

    Tracker.flush();
    test.equal(counter, 1);
});
