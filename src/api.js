var request = require('superagent');
import {storage} from './utils';

var items = {
  default: '-type:"Layer" -type: "Map Document" -type:"Map Package" -type:"Basemap Package" -type:"Mobile Basemap Package" -type:"Mobile Map Package"  -type:"ArcPad Package" -type:"Project Package" -type:"Project Template" -type:"Desktop Style" -type:"Pro Map" -type:"Layout" -type:"Explorer Map" -type:"Globe Document" -type:"Scene Document" -type:"Published Map" -type:"Map Template" -type:"Windows Mobile Package" -type:"Layer Package" -type:"Explorer Layer" -type:"Geoprocessing Package" -type:"Application Template" -type:"Code Sample" -type:"Geoprocessing Package" -type:"Geoprocessing Sample" -type:"Locator Package" -type:"Workflow Manager Package" -type:"Windows Mobile Package" -type:"Explorer Add In" -type:"Desktop Add In" -type:"File Geodatabase" -type:"Feature Collection Template" -type:"Code Attachment" -type:"Featured Items" -type:"Symbol Set" -type:"Color Set" -type:"Windows Viewer Add In" -type:"Windows Viewer Configuration"',
  all: '',
  webmap: '(type:"Web Map" OR type:"CityEngine Web Scene") -type:"Web Mapping Application" -(owner:"esri" tags:"basemap")',
  weblayer: '(type:"Feature Collection" OR type:"Feature Service" OR type:"Image Service" OR type:"Map Service" OR type:"Scene Service" OR type:"Stream Service" OR type: "WMS" OR type: "KML") -type:"Web Map" -type:"Web Mapping Application" -type:"Shapefile"',
  scene: '-type:"CityEngine Web Scene" (type:"Web Scene")',
  application: '(type:"Code Sample" OR type:"Web Mapping Application" OR type:"Mobile Application" OR type:"Application" OR type:"Desktop Application Template" OR type:"Desktop Application" OR type:"Operation View")',
  tool: '-type:"KML" (typekeywords:"tool" OR type:"Raster function template" OR type:"Geodata Service" OR type: "Workflow Manager Package" OR type:"Rule Package" OR type:"Operations Dashboard Add In" OR type:"Workflow Manager Service")'
};

/**
 * [getPortalSelf description]
 * @return {[type]} [description]
 */
export function getPortalInfo() {
  var promise = new Promise(function(resolve, reject) {
    request
    .get('/rest/portals/self')
    .query({f: 'json'})
    .end(function(err, res) {
      if(err) {
        reject(err)
      } else {
        resolve(JSON.parse(res.text));
      }
    });
  });

  return promise;
}

/**
 * Returns a PortalUser object that describes the user currently signed in to the portal.
 */
export function getPortalUser() {
  var promise = new Promise(function(resolve, reject) {
    request
    .get('/rest/portals/self/users')
    .query({token: queryParams.token})
    .query({start: queryParams.start})
    .query({num: queryParams.num})
    .query({sortField: queryParams.sortField||'created'})
    .query({f: 'json'})
    .end(function(err, res) {
      if(err) {
        reject(err)
      } else {
        resolve(JSON.parse(res.text));
      }
    });
  });

  return promise;
}

/**
 * Execute a query against the Portal to return a deferred that when resolved returns PortalQueryResult that contain a results array of PortalGroup objects for all the groups that match the input query.
 *
 * @param {object} queryParams The input query parameters.
 * @param {String} q The query string used for a search. View the ArcGIS REST API Search Reference for details on constructing a valid query.
 * @param {Number} num The maximum number of results to be included in the result set response. The Default value is 10 and the maximum allowed value is 100. The start parameter combined with the num parameter can be used to paginate the search results. Note that the actual number of returned results may be less than num if the number of results remaining after start is less than num.
 * @param {Number} start 	The number of the first entry in the result set response. The index number is 1-based. The start parameter, along with the num parameter can be used to paginate the search results.
 * @param {String} sortField 	A comma separated list of field(s) to sort by. Valid fields are: title, created, type, owner, avgRating, numRatings, numComments and numViews.
 *
 * @return {[type]}             [description]
 */
export function queryGroups(queryParams) {

}

/**
 * Execute a query against the Portal to return a deferred that when resolved returns PortalQueryResult that contain a results array of PortalItem objects that match the input query.
 *
 * @param {object} queryParams The input query parameters.
 * @param {String} q The query string used for a search. View the ArcGIS REST API Search Reference for details on constructing a valid query.
 * @param {Number} num The maximum number of results to be included in the result set response. The Default value is 10 and the maximum allowed value is 100. The start parameter combined with the num parameter can be used to paginate the search results. Note that the actual number of returned results may be less than num if the number of results remaining after start is less than num.
 * @param {Number} start 	The number of the first entry in the result set response. The index number is 1-based. The start parameter, along with the num parameter can be used to paginate the search results.
 * @param {String} sortField 	A comma separated list of field(s) to sort by. Valid fields are: title, created, type, owner, avgRating, numRatings, numComments and numViews.
 *
 * @return {[type]}             [description]
 */
export function queryItem(queryParams) {
  var promise = new Promise(function(resolve, reject) {
    request
    .get('rest/search')
    .query({q: 'accountid:' + storage.getItem('orgid') + ' ' + items['default'] + ' ' + items[queryParams.type]})
    .query({start: queryParams.start})
    .query({num: queryParams.num})
    .query({sortField: queryParams.sortField||'created'})
    .query({f: 'json'})
    .end(function(err, res) {
      if(err) {
        reject(err)
      } else {
        resolve(JSON.parse(res.text));
      }
    });
  });

  return promise;
}

/**
 * [queryItemByUser description]
 * @param  {[type]} queryParams [description]
 * @return {[type]}             [description]
 */
export function queryItemByUser(queryParams) {
  var promise = new Promise(function(resolve, reject) {
    request
    .get('/rest/content/users/arcgis')
    .query({token: queryParams.token})
    .query({start: queryParams.start})
    .query({num: queryParams.num})
    .query({sortField: queryParams.sortField||'created'})
    .query({f: 'json'})
    .end(function(err, res) {
      if(err) {
        reject(err)
      } else {
        resolve(JSON.parse(res.text));
      }
    });
  });

  return promise;
}

/**
 * Execute a query against the Portal to return a deferred that when resolved returns PortalQueryResult that contain a results array of PortalUser objects that match the input query.
 *
 * @param {object} queryParams The input query parameters.
 * @param {String} q The query string used for a search. View the ArcGIS REST API Search Reference for details on constructing a valid query.
 * @param {Number} num The maximum number of results to be included in the result set response. The Default value is 10 and the maximum allowed value is 100. The start parameter combined with the num parameter can be used to paginate the search results. Note that the actual number of returned results may be less than num if the number of results remaining after start is less than num.
 * @param {Number} start 	The number of the first entry in the result set response. The index number is 1-based. The start parameter, along with the num parameter can be used to paginate the search results.
 * @param {String} sortField 	A comma separated list of field(s) to sort by. Valid fields are: title, created, type, owner, avgRating, numRatings, numComments and numViews.
 *
 * @return {[type]}             [description]
 */
export function queryUsers(queryParams) {

}

/**
 * Prompts the user using the IdentityManager and returns a deferred that, when resolved, returns the PortalUser for the input credentials.
 * @return {[type]} [description]
 */
export function logIn() {

}

/**
 * Sign out of the Portal which resets the Portal and disables identity checking.
 * @return {[type]} [description]
 */
export function signOut() {

}
