#!/usr/bin/env node
let fs = require("fs")
let myProgram = require("commander")
let cmdValue;

myProgram.action(function (cmd, env) { cmdValue = cmd })

myProgram.parse(process.argv)

const directories = [
	"controllers", 
	"helpers", 
	"middlewares",
	"models",
	{
		public: [
			"js",
			"css",
			"html"
		]
	},
	"views"
]

if (cmdValue) {
	let mainDir = `${process.cwd()}/${cmdValue}` 
	fs.mkdirSync(mainDir)

	directories.forEach(function(directory){

		if (typeof(directory) === "string"){
			fs.mkdirSync(`${mainDir}/${directory}`)
		} else {
			fs.mkdirSync(`${mainDir}/public`)
			
			directory.public.forEach(function(subDir){
				fs.mkdirSync(`${mainDir}/public/${subDir}`)
			})
		}
	})
} else {
	console.error("Please enter a project name!")
}