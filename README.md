[![Build Status](https://travis-ci.org/gustawdaniel/reactive-set.svg?branch=master)](https://travis-ci.org/gustawdaniel/reactive-set)

# Install

    meteor add gustawdaniel:reactive-set

# Examples

#### Basic use

Create new reactive set.

    let set = new ReactiveSet();
    
#### Template use

Create new reactive set scoped to a template

    Template.example.onCreated(function() {
        this.set = new ReactiveSet();
    });
    
Add elements to set you created in your template

    Template.example.events({
        'click .class'(event, instance) {
            instance.set.add(event.target.value)
        }
    });

Show what's been added to the array you created in your template

    Template.example.helpers({
        clickedElements() {
            return Template.instance().set.get();
        }
    });

#### Server side

You can use this on server side

    import { Meteor } from 'meteor/meteor';
    import { ReactiveSet } from 'meteor/gustawdaniel:reactive-set'
    
    Meteor.startup(() => {
        let set = new ReactiveSet();
    
        let counter = 0;
    
        setInterval(function () {
            set.add(counter++);
        },1000);
    
        Tracker.autorun(function () {
            console.log(set.get())
        });
    
    });

#### Methods

It has methods:

    ( add, get, set, has )

# Contribution

If you are interested to contribute, then I typed simple instruction of install this
package locally, run tests and use it in exemplary meteor app. This docs is placed in 
[wiki](https://github.com/gustawdaniel/reactive-set/wiki/Contribution).

# TODO: 

+ [ ] Add rest of methods
+ [x] Add contribution readme
+ [x] Add continuous integration  
+ [x] Register in atmosphere

----

Further reading about Set object

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set