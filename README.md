# Muber Perks

![Build Status](https://magnum-ci.com/status/d73c2bf711abc0ad46d247b09088e4e5.png)

This is the main application for Muber Perks. It contains the user-facing front-end
application as well as the API to the back-end.

## Prerequisites

Alright, so you wanted to run Muber Perks application in your development machine.
Let's get started!

### Muber Tech Stack
* Ruby 2.1.2
* Rails 4.1.4
* AngularJS 1.2.20
* Slim 2.0.3
* Sass 3.2.19
* PostgreSQL

### What OS should I use?

We recommend you develop the application in Mac OS X or in a Linux machine.
It will just run as fine in Windows, but there's going to be more work setting it up.
After all, we're Mac fans!

### Which text editor should I use?

Well, I guess the best answer would be, use whatever it is that you're most
comfortable using (it could be Textmate, Sublime, or - God forbid - Notepad!).
But if you'd like us to recommend, we'd suggest [Atom](http://atom.io). It's a neat
text editor made by the folks at Github.

**We use linters too.** As added package for atom, we use ruby, js, and css linters
to help us write beautiful code. Read here for reference on how to install:
[https://atom.io/packages/linter](https://atom.io/packages/linter)

### Install Ruby

This is a Ruby on Rails application, so you will need Ruby installed if you don't
have already.

We recommend installing Ruby via [rvm](https://rvm.io).
Please read the rvm guide on how to install it.

### Install Homebrew as your package manager

**This is optional and ONLY for OS X users.**

We recommend that you install [Homebrew](http://brew.sh) as your package manager.
This is optional, and you can definitely choose to use other package managers,
but this will definitely make your life so much easier.

### Install git

We use git for versioning. You will need to install it, if you don't have it already.

    brew install git

### Install PostgreSQL

If you don't have it already, you will need PostgreSQL installed in your machine.
We use Postgres for development as well as in a production environment.

And because we recommended you install Homebrew, here's how to do it:

    brew install postgres
    initdb /usr/local/var/postgres -E utf8
    cp /usr/local/Cellar/postgresql/9.3.4/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
    launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
    createuser -s -r postgres

If you already have Postgres but don't have `postgres` user and command above doesn't help try this:

    psql template1
    CREATE ROLE postgres LOGIN
    SUPERUSER INHERIT CREATEDB CREATEROLE REPLICATION;
    \q

## Setting up Muber Perks

Now that you have all the prerequisites installed, at this point we're probably ready
to setup Muber Perks.

First, you will need to clone the repository from Github.

    git clone git@github.com:muber/perks.git
    cd perks
    git checkout master

Since we have specified a gemset in this repository, cloning this will probably create
a gemset for you called `rails4-perks`. If later it asks you to install Ruby 2.1.0, kindly
install it while in the `perks` directory and while this gemset is selected.

Now that we have cloned the repository, we're probably ready to start setting up Perks.

**The following instructions will assume you are inside perks repository.**

First we need, to install all gems needed for this project.

    bundle install

Next we need to initialize our database.

    bundle exec rake db:create
    bundle exec rake db:migrate

At this point you are ready to run the server for Perks. You can do `bundle exec rails server`
or use Pow (which we recommend, read on the next section).

### Install Pow

You can get pow from [here](http://pow.cx).

After that, we need to tell pow to server our application.

    mkdir ~/.pow
    cd ~/.pow
    ln -s /path/to/perks ./perks

After this, you should be able to see the application running at `http://perks.dev`.

We also recommend you install the `powder` gem to control pow.
So, while in the perks repository:

    gem install powder

Now you can control pow, with the following commands:

    powder restart
    powder up
    powder down

See [https://github.com/rodreegez/powder](https://github.com/rodreegez/powder) for reference.

### Using guard for livereload

Guard is a command line tool to easily handle events on file system modifications.
We use it primarily for livereload in an event of filechanges, particularly useful
during development.

The gem to use guard should be installed when you run `bundle install`. To use guard,
all you have to do is

    bundle exec guard

and it should be listening for file changes and reloads your dev site accordingly.

## Style Guide

#### At Muber, we believe that great code is as much important as great product!

We base our coding style off Airbnb's Ruby and Javascript style guides. We have forked both
style guides and please allocate couple of minutes of your time going through these awesome
coding guides:

[Ruby Style Guide](https://github.com/muber/ruby)

[Javascript Style Guide](https://github.com/muber/javascript)

### Be Consistent

> If you're editing code, take a few minutes to look at the code around you and
> determine its style. If they use spaces around all their arithmetic
> operators, you should too. If their comments have little boxes of hash marks
> around them, make your comments have little boxes of hash marks around them
> too.

> The point of having style guidelines is to have a common vocabulary of coding
> so people can concentrate on what you're saying rather than on how you're
> saying it. We present global style rules here so people know the vocabulary,
> but local style is also important. If code you add to a file looks
> drastically different from the existing code around it, it throws readers out
> of their rhythm when they go to read it. Avoid this.

&mdash;[Google C++ Style Guide][google-c++]


## Questions?

Find this README out of date? Any inaccurate information? If you have any questions or comments, please direct them to [@FrancisPlaza](https://github.com/FrancisPlaza).

[google-c++]: http://google-styleguide.googlecode.com/svn/trunk/cppguide.xml
