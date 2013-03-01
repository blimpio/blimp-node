# blimp-node #

This library allows you to interact with the Blimp API using Node. You can find more information
about Blimp's Public API documentation at [http://dev.getblimp.com/](http://dev.getblimp.com/).
If you have any problems or requests please contact [support](mailto:support@getblimp.com?subject=Blimp API Python library).

## License ##
Licensed under the MIT License.

## Install ##

```
npm install blimp
```
## Pre-Usage ##

Before we begin using the library you need to signup to [Blimp](http://app.getblimp.com/) and generate a new API Key if you don't have one in your [settings](https://app.getblimp.com/user/settings/api/) as well as an Application ID and Secret in your [applications](https://app.getblimp.com/user/settings/api/developers/).

## Usage ##

```
var Blimp = require('blimp');

var blimp = new Blimp({
    username: 'username',
    apiKey: 'apikey',
    appId: 'appid',
    secret: 'secret'
});

// get all companies that I'm part of
blimp.get('company', function(results) {
    console.log(results);
});

// get one company by id
blimp.get('company', 1, function(results) {
    console.log(results);
});

// get all projects for one company
blimp.get('company', {company: 1}, function(results) {
    console.log(results);
});

// get count of total projects
blimp.get('project', function(results) {
    console.log(JSON.parse(results).meta.total_count);
});

// Loop through all projects and print their name
blimp.get('project', function(results) {
    JSON.parse(results).objects.forEach(function(project) {
        console.log(project.name);
    });
});

// Get all goals for a project
blimp.get('goal', {project: 1}, function(results) {
    console.log(results);
});

// Get all tasks for a goal
blimp.get('task', {goal: 1}, function(results) {
    console.log(results);
});

// Get all comments for a task
blimp.get('comment', {content_type: 'todo', object_pk: 1}, function(results) {
    console.log(results);
});

// Get schema for company endpoint
blimp.schema('company', function(schema) {
    console.log(schema);
});

// All available methods per endpoint
// blimp.get(resource, [id], [params], callback)
// blimp.post(resource, data, [params], callback)
// blimp.put(resource, id, [params], data, callback)
// blimp.del(resource, id, callback)
// blimp.schema(resource, callback)
```
### Example response of all companies I'm part of ###
```
{
    "meta": {
        "limit": 20,
        "next": null,
        "offset": 0,
        "previous": null,
        "total_count": 1
    },
    "objects": [
        {
            "company_users": [
                {
                    "accepted_invitation": true,
                    "date_created": "2012-11-01T00:00:00",
                    "date_modified": "2012-11-27T02:22:09.817265",
                    "id": 38,
                    "is_active": true,
                    "role": "admin",
                    "user": "/api/v2/user/3/"
                },
                {
                    "accepted_invitation": true,
                    "date_created": "2012-11-01T00:00:00",
                    "date_modified": "2012-11-27T02:22:09.705959",
                    "id": 37,
                    "is_active": true,
                    "role": "admin",
                    "user": "/api/v2/user/2/"
                },
                {
                    "accepted_invitation": true,
                    "date_created": "2012-11-01T00:00:00",
                    "date_modified": "2012-11-27T02:22:09.380851",
                    "id": 39,
                    "is_active": true,
                    "role": "owner",
                    "user": "/api/v2/user/1/"
                }
            ],
            "date_created": "2012-11-01T00:00:00",
            "date_modified": "2012-12-21T21:57:09.965247",
            "id": 1,
            "image_url": "",
            "name": "Blimp",
            "resource_uri": "/api/v2/company/1/",
            "slug": "blimp",
            "used_projects": 0,
            "used_storage": "4929882"
        }
    ]
}
```

## Improvements
What else would you like this library to do? Let me know. Feel free to send pull requests for any improvements you make.

### Todo
* Tests
