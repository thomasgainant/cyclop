# Cyclop

<p align="center">
  <img alt="Cyclop" src="https://github.com/thomasgainant/cyclop/raw/master/logo.png">
</p>

Cyclop is a high speed database solution based the [linked list technique](https://en.wikipedia.org/wiki/Linked_list).

This database system saves objects as a list of chained pointers in order to improve parsing speed.

## Speed and persistence at the same time

Databases are meant to persist data on a ROM memory. Contrary to RAM memory, when you shut down a database machine, the data will still be there when you start the machine again. But the bad side of a database using ROM is its low speed. Reading and writing into a ROM memory is always slower than accessing something inside your RAM.

Cyclop tries to take the good sides of both ROM and RAM systems without the drawbacks. A cache system keeps every data objects in memory in order to access, create and update them with high speed. An asynchronous thread will then take care of saving the objects into a compressed file to make them persist. This saving system will be only called when there are modifications to be saved, but without obliging whoever queried the database to wait for the actions to be written in ROM.

## How does it work?

On top of using a cache system instead of writing directly on disk, Cyclop uses the linked list technique to optimise its speed.

<p align="center">
  <img alt="Linked list" src="https://github.com/thomasgainant/cyclop/raw/master/Singly-linked-list.png">
</p>

Every data object has a reference to the next data object in memory, therefore speeding the parsing process of the database system. We use for this the bahaviour of references in Javascript on node.js, which are mimicking the behaviour of a C++ pointer. Having a reference to the next data object is like keeping in memory the RAM address on which to look to find the next data object. This technique is for instance heavily used in video game programming for parsing every game entities, as they all have to be updated very often and at high speed in the frame loop.

## Document oriented database

Made to work good with modern Javascript, this database system follows the document-oriented database design like MongoDB, Redis, CouchDB, etc. Every documents ("data objects") are saved as a file on the disk.

## Independent

Only using node.js, its http and fs modules and native Javascript. No other messy dependencies to install.

## How to use it

Start the database service by using the command:

```node index.js```

The database service will be listening on the port 3987 of your url. After sending your queries to http://your-url:3987, the data objects will now be saved as plain files within the "data" local folder.

**Windows:** A runtime application has been compiled and can be launched out of the box. Just run cyclop.exe. Make sure that you have every files from the repo within the folder you copied the .exe, including the "data" folder, even if it is empty.

### Add an object

Send your data object with a POST request to your database system. Your data object should be described in the JSON format inside the body of your request.

<p align="center">
  <img alt="Send query" src="https://github.com/thomasgainant/cyclop/raw/master/doc1.png">
</p>

After your query has been processed by the database system, you will receive a JSON object inside the body of the response. Your data object has been saved and now have an identification number.

<p align="center">
  <img alt="Get response" src="https://github.com/thomasgainant/cyclop/raw/master/doc2.png">
</p>


### Update an object

Send your data object with a POST request to your database system. Your data object should be described in the JSON format inside the body of your request, **with the correct id attribute**.

After your query has been processed by the database system, you will receive a JSON object inside the body of the response, representing your updated object.

## Inspiration

This project was inspired by the [linked list technique](https://en.wikipedia.org/wiki/Linked_list) previously used in a custom video game engine built by the author, a conversation with [Jean-Jacques Delmont](https://www.linkedin.com/in/jean-jacques-delmont-97798634/) about his previous handling of [hierarchical databases](https://en.wikipedia.org/wiki/Hierarchical_database_model) during his early career as a Cobol developer, and the author-beloved [No-SQL/document-oriented database systems](https://en.wikipedia.org/wiki/Document-oriented_database).

## Roadmap

The next goals of this project:

- Handling of get a specific data object within the chain, using the GET verb with an id
- Handling of deleting data objects within the chain, using the DELETE verb
- Encrypted files
- Handling of get a specific data object within the chain, using the GET verb with filters and conditions
- Basic and fast authentication

## Team

[Thomas Gainant](http://thomas-gainant.eu)

Thinking this is a good idea? Any suggestions? Wanting to contribute? Shoot me a PM! It would be good to have a dedicated team behind this project!