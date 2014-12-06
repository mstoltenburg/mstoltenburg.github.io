module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		responsive_images: {
			options: {
				engine: 'im',
				quality: 80,
				newFilesOnly: true,
				sizes: [
					{
						name: 'phone',
						// height: 213,
						width: 320
					},
					{
						name: 'tablet',
						// height: 512,
						width: 768
					},
					{
						name: 'desktop',
						// height: 453,
						width: 680
					}
				]
			},
			all: {
				files: [{
					expand: true,
					cwd: 'assets/images/_fullsize',
					src: ['**/*.{JPG,jpg,gif,png}'],
					// dest: 'assets/images/pictures/'
					custom_dest: 'assets/images/{%= name %}/'
				}]
			},
		},
		responsive_images_converter: {
			options: {
				asset: '/assets/images/',
				queries: [{
					name: 'phone',
					media: '(max-width:320px)'
				},{
					name: 'tablet',
					media: '(max-width:800px)',
					//device pixel ratio( 1 is default )
					// dprs: [ 2 ],
					// suffix: '@'
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
		},
		watch: {
			images: {
				files: [ 'assets/images/_fullsize/*.JPG' ],
				tasks: 'responsive_images'
			},
			posts: {
				files: [ '_originals/*.md' ],
				tasks: 'responsive_images_converter'
			},
			config: {
				files: [
					'bower.json',
					'Gruntfile.js'
				],
				options: {
					reload: true
				}
			}
		}
	});

	// Load required plugins
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-responsive-images-converter');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks.
	grunt.registerTask('default', ['images']);
	grunt.registerTask('images', ['responsive_images', 'responsive_images_converter']);

};
