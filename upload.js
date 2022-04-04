

Coffee Talk: Java, News, Stories and Opinions
NEWS
Node.js file upload example with Ajax and JavaScript
Cameron McKenzie
TechTarget
07 Feb 2022
  


The art of the file upload is not elegantly addressed in languages such as Java and Python. But a file upload in Node is a relatively straightforward endeavor, especially if you have the right NPM libraries at your fingertips.

In this quick tutorial, I’ll show you how to upload a file from a web browser, with a Node.js file upload handler on the server-side, and a pure, Ajax based JavaScript process on the client side.

Step-by-step Node.js file upload example
The basic steps in this example to upload a file with Node.js and JavaScript follow this order:

Ensure Node.js is installed locally
Create a file named upload.js
Add FileSystem (fs) and Formidable library dependencies
Use Node.js to parse the incoming file and move it to a preferred folder
Create an HTML upload form in a file named index.js
Run the JavaScript file and use the HTML form to upload files
Optionally configure the HTML page to upload with Ajax and JavaScript
Node web service
The first step is to make sure Node is installed on your computer. A quick version query will tell you this. I’m doing this tutorial on Node version 16.13.2.


More file upload options
I put together a bunch of file upload tutorials. Pick your technology and get uploading!

Jakarta EE compliant Servlet and JSP file uploading
Why not upload files with Apache Commons?
Some people want to upload files with Spring Boot
Does anyone still use Struts to upload files?
Upload files with Ajax and JavaScript on the client
We even have a PHP file upload example
Uploading files to the server need not be a problem.

node@javascript /c/upload-example
$ node --version
v16.13.2
We want to walk before we run, so let’s first create a simple Node.js example that spits out a status message in a browser. Create a file named upload.js, and populate it with the following code:

let http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Node JS File Uploader Checkpoint');
}).listen(80);
Open a command prompt in the same folder as the upload.js file and run the following command:

node@javascript /c/upload-example
$ node upload.js

As the command runs, open a browser and navigate to localhost:80/upload

simple JavaScript file upload 
The first step to upload files with Node is to get a simple web service working.

The text ‘Node JS File Uploader Checkpoint’ will display in the browser window.

HTML 5 file uploader
In the same folder as update.js, create another file named index.html and code an HTML 5 file uploader:

<html> 
  <head><title> NodeJS File Upload Example </title></head> 
  <body>
    <form action="http://localhost:80/upload" method="post" enctype="multipart/form-data">
      <!-- HTML5 file upload selector-->
      <input type="file" name="fileupload">
      <br>
      <input type="submit">
    </form>
  </body> 
</html>
The input tag with its type attribute set to file will render a file selector component on the webpage.

The multipart enctype setting on the form makes it possible to upload files to the server.

Open the index.html page in a browser and click the submit button. The Node.js web service will run, and print out the checkpoint message to the screen.

The webpage now invokes the web service correctly. The next step is to implement the Node.js JavaScript upload functionality.

Install formidable and fs libraries
We need both the filesystem (fs) and formidable libraries to help handle the Node.js file upload. Stop the running server and issue the following two npm install commands:

node@javascript /c/upload-example
$ npm install fs

node@javascript /c/upload-example
$ npm install formidable
Node.js file uploader JavaScript implementation
Now rewrite the Node.js component to use both the Formidable and the FileSystem (fs) library.

In the createServer method, we will create an instance of Formidable’s IncomingForm object, which handles the intricacies of the file upload.

In the IncomingForm object’s parse method, we use the FileSystem library’s rename method to move the file from it’s original download location to a custom folder named C:/upload-example/

When the operation is complete, it sends a Node.js File Upload Success message to the browser.

let http = require('http');
let formidable = require('formidable');
let fs = require('fs');

http.createServer(function (req, res) {

  //Create an instance of the form object
  let form = new formidable.IncomingForm();

  //Process the file upload in Node
  form.parse(req, function (error, fields, file) {
    let filepath = file.fileupload.filepath;
    let newpath += file.fileupload.originalFilename;

    //Copy the uploaded file to a custom folder
    fs.rename(filepath, newpath, function () {
      //Send a NodeJS file upload confirmation message
      res.write('NodeJS File Upload Success!');
      res.end();
    });
  });

}).listen(80);
