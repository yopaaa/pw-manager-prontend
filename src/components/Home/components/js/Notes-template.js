const template = [
  {
    text: "one",
    value: `
# Foobar

Hi this is my project for portofolio,
this app run in nodejs envirotment made with expressJS 

use mongodb for database 

Json Web Token for secure session

Encrypt user password use bcrypt

Docker for packages


## Installation

Use the package manager [npm]() to install dependencies.

\`\`\`bash
git clone ...

cd pw-manager-backend

npm install
\`\`\`

## Environment

> in root directory create .env file and write
\`\`\`js
MAIN_PORT=<YOUR_BACKEND_PORT> // 8080

MONGODB_USER_NAME=<YOUR_MONGODB_USERNAME>

MONGODB_PASSWORD=<YOUR_MONGODB_PASSWORD>

MONGODB_HOST=<YOUR_MONGODB_HOST> // 0.0.0.0:27017

MONGODB_DATABASE=<YOUR_DATABASE_NAME>

NODE_ENV=<YOUR_NODE_ENVIRONMENT> //"production" || "testing"

CORS=<YOUR_FRONTEND_END_POINT> // http://example.com

JWT_SECRET_TOKEN=<YOUR_SECRET_TOKEN> // super-secret

WHITE_LIST_CORS=<YOUR_FRONTEND_PATH>

LOG_FILE_PATH=/path/to/dir/

\`\`\`


## Usage

\`\`\`
bash
# node app.js
npm run start

# nodemon app.js
npm run startDev

# pm2 start app.js
npm run startProd
\`\`\`


## API

> this example use port 8080

\`\`\`
bash
# create new users
http://localhost:8080/sign/up
# must contain json, data example
# {
#   "name": "John doe",
#   "email": "JohnDoe@gmail.com",
#   "pwd": "secret",
#   confirmpwd": "secret"
# } 
# return cookies


# login to exist users
http://localhost:8080/sign/in
# must contain json data, example
# {
#   "name": "John doe",
#   "pwd": "secret",
# } 
# return cookies


# to sign out
http://localhost:8080/sign/out
# remove cookies


# to extend sesions
http://localhost:8080/sign/token
# return cookies

\`\`\`


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT]()`,
  },
  {
    text: "image",
    value: `# Foobar

Create dynamic form with only html css and html

![demo ui](./ui.png)


## Installation

Use the terminal to clone repository.

\`\`\`bash
git clone https://github.com/yopaaa/dynamic-forms.git
\`\`\`

## License

[MIT](https://choosealicense.com/licenses/mit/)
`,
  },
  {
    text: "Advertisement",
    value: `
---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!`
  },
  {
    text:"heading",
    value: `

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---`
  },
  {
    text: "Typographic",
    value: `
***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'

    `
  },
  {
    text: "Emphasis",
    value: `
## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~
`
  },
  {
    text: "Blockquotes",
    value: `

## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

`
  },{
    text: "Lists",
    value: `
## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
* Ac tristique libero volutpat at
+ Facilisis in pretium nisl aliquet
- Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar`
  },{
    text: "code",
    value: `

## Code

Inline \`code\`

Indented code

   // Some comments
   line 1 of code
   line 2 of code
   line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`
    `
  },{
    text: "table",
    value: `

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext| extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
    `
  },{
    text: "links",
    value: `

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)
    `
  },{
    text: "images",
    value: `

## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
`
  },{
    text: "Plugins",
    value: `
## Plugins

The killer feature of \`markdown-it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

      { some code, part of Definition 2 }
    
    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

::: warning
*here be dragons*
:::
`
  }
]

export default template
