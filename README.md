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

Further reading about Set object

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set