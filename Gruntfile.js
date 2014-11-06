module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		responsive_images: {
			options: {
				engine: 'im',
				quality: 50,
				newFilesOnly: true,
				sizes: [
					{
						name: 'phone',
						width: 320
					},
					{
						name: 'tablet',
						width: 768
					},
					{
						name: 'tablet',
						suffix: '@2',
						width: 1536
					},
					{
						name: 'desktop',
						width: 1024
					}
				]
			},
			all: {
				files: [{
					expand: true,
					cwd: 'assets/images/_fullsize',
					src: ['**/*.{JPG,jpg,gif,png}'],
					dest: 'assets/images/pictures/'
				}]
			},
		},
		responsive_images_converter: {
			options: {
				asset: '/assets/images/pictures/',
				queries: [{
					name: 'phone',
					media: '(max-width:320px)'
				},{
					name: 'tablet',
					media: '(max-width:800px)',
					//device pixel ratio( 1 is default )
					dprs: [ 2 ],
					suffix: '@'
				},{
					name: 'desktop',
					media: '(min-width:800px)'
				}]
			},
			all: {
				files: [{
					expand: true,
					cwd: '_originals',
					src: [ '*.md' ],
					dest: '_posts'
				}]
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-responsive-images-converter');

	// Register tasks.
	grunt.registerTask('default', ['images']);
	grunt.registerTask('images', ['responsive_images', 'responsive_images_converter']);

};
