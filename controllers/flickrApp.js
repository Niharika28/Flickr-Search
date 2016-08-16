angular.module('flickrApp',[])
.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}).controller('MyController', function($http,$sce){
  
  var vm = this;
  vm.imgSearch = false; 
  vm.trustSrc = function(src) {
	  return $sce.trustAsResourceUrl(src);
  };

  vm.submitForm = function(search_tag) {
  	vm.imgSearch = true;
  	var url = "https://api.flickr.com/services/rest";

  	var requestParams = {
    method: 'flickr.photos.search',
    api_key: '4f70f4c16a214b011fe7d849ba2dcaa3',
    tags: search_tag,
    format: 'json',
    maxResults: 20,
    nojsoncallback: 1
	}
	$http({
      method: 'GET',
      url: url,
      params: requestParams
    })
    .then(function(response) {
      vm.images = response.data.photos.photo;
      if(vm.images.length < 0){
      	vm.outputMsg = "No Results Found";
      }
      vm.imgSearch = false;
      vm.imageLength = vm.images.length;
    },
    function(result) {
      vm.imgSearch = false;
      alert('error');
    });
  }

});