
require 'yaml'
file_array = YAML.load(File.read("createFile.yml"))
  file_array.each { 
      |x| 
      File.open( "translate/#{x}.md", 'w' ) do |the_file|
          the_file.puts "--- \nlayout: translate \nfileName: translate_english_to_hindi \npermalink: /#{x}\n---"

            end
      }
    