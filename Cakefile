fs     = require 'fs'
{exec, spawn} = require 'child_process'

appFiles  = [
  # omit src/ and .coffee to make the below lines a little shorter
  'Helpers'
  'TicTacToe'
]
task 'watch', 'Build the first source file, and watch it', ->
  coffee = spawn 'coffee', ['-cw', '-o', 'app.coffee', '/src']
  coffee.stdout.on 'data', (data) -> console.log data.toString().trim()

task 'build', 'Build single application file from source files', ->
  appContents = new Array remaining = appFiles.length
  for file, index in appFiles then do (file, index) ->
    fs.readFile "src/#{file}.coffee", 'utf8', (err, fileContents) ->
      throw err if err
      appContents[index] = fileContents
      process() if --remaining is 0
  process = ->
    fs.writeFile 'app.coffee', appContents.join('\n\n'), 'utf8', (err) ->
      throw err if err
      exec 'coffee --compile app.coffee', (err, stdout, stderr) ->
        throw err if err
        console.log stdout + stderr
        fs.unlink 'app.coffee', (err) ->
          throw err if err
          console.log 'Done.'