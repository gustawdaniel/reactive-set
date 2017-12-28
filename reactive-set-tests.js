// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by reactive-set.js.
import { name as packageName } from "meteor/gustawdaniel:reactive-set";

// Write your tests here!
// Here is an example.
Tinytest.add('reactive-set - example', function (test) {
  test.equal(packageName, "reactive-set");
});
