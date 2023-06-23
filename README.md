# ForemanHdm

[![License](https://img.shields.io/github/license/betadots/foreman_hdm.svg)](https://github.com/betadots/foreman_hdm/blob/master/LICENSE)
[![Test](https://github.com/betadots/foreman_hdm/actions/workflows/test.yml/badge.svg)](https://github.com/betadots/foreman_hdm/actions/workflows/test.yml)
[![Release](https://github.com/betadots/foreman_hdm/actions/workflows/release.yml/badge.svg)](https://github.com/betadots/foreman_hdm/actions/workflows/release.yml)
[![RubyGem Version](https://img.shields.io/gem/v/foreman_hdm.svg)](https://rubygems.org/gems/foreman_hdm)
[![RubyGem Downloads](https://img.shields.io/gem/dt/foreman_hdm.svg)](https://rubygems.org/gems/foreman_hdm)

Browse hiera data for a given Host using [HDM](https://github.com/betadots/hdm) and the [HDM smart proxy plugin](https://github.com/betadots/foreman_hdm).

## Installation

See [How_to_Install_a_Plugin](http://projects.theforeman.org/projects/foreman/wiki/How_to_Install_a_Plugin)
for how to install Foreman plugins

## Usage

*Usage here*

## TODO

*Todo list here*

## Contributing

Fork and send a Pull Request. Thanks!

## Copyright

Copyright (c) 2023 betadots GmbH

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

## Release a new version

To make a new release, please do:

* update the version in `lib/foreman_hdm/version.rb`
* Install gems with `bundle install --with release --path .vendor`
* generate the changelog with `bundle exec rake changelog`
* Check if the new version matches the closed issues/PRs in the changelog
    * if required, add labels to unlabled PR/issues, regenerate the changelog
* Create a PR with it
* After it got merged, push a tag that's prefixed with `v`. GitHub Actions will do the actual release to Rubygems and GitHub Packages
