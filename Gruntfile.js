module.exports = function (grunt) {
        grunt.initConfig({
                connect: { 
					server: { /* Подзадача */
						options: {
						keepalive: false, /* работать постоянно */
						port: 8000, /* номер порта */
						base: 'public', /* публичная директория */
						livereload: true /*автоматическая перезагрузка */
						}
					}
				},
       
				fest:{
					templates: { /* Подзадача */
						files: [{
							expand: true,
							cwd: 'templates', /* исходная директория */
							src: '*.xml', /* имена шаблонов */
							dest: 'public/js/tmpl' /* результирующая директория */
						}], 
						options: {
							template: function (data) { /* формат функции-шаблона */
								return grunt.template.process(
								/* присваиваем функцию-шаблон переменной */
								'var <%= name %>Tmpl = <%= contents %> ;',
								{data: data}
								);
							}

						}
					}
				}, 

				concat: {
					options: {
						separator: ';'
					},
					dist: {
				      src: ['public/js/lib/*.js', 'public/js/tmpl/*.js'],
				      dest: 'public/js/concat.js'
				    }
				},

				watch:{
					fest: { /* Подзадача */
						files: ['templates/*.xml'], /* следим за шаблонами */
						tasks: ['fest'], /* перекомпилировать */
						options: {
							atBegin: true/* запустить задачу при старте */
						}
					},
					concat: {
		                files: ['public/js/lib/*.js', 'public/js/tmpl/*.js'],
		                tasks: ['concat'],
		                options: {
							atBegin: true,/* запустить задачу при старте */
							livereload: true
						}
		            },
		            refresh: {
		            	files: [ "public/**/*"],
		            	options:
		            	{
		            		livereload: true
		            	}
		            }
		        }

							
 });
    grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-fest');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['connect', 'watch']);
};


