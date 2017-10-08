const _DEFAULT = {
  CODE: undefined
}

export default class Document {

  constructor(props){

    const _code = props!==undefined&&props.code!==undefined?props.code:_DEFAULT.CODE;

    this.html =

      `<!doctype html>
      <html>
      <head>
      <meta charset="utf-8">
      <script type="text/javascript">
      window.__CODE__ = ${_code}
      </script>
      </head>
      <body>
      <script src="/static/bundle.js"></script>
      </body>
      </html>`;

  }

  get(){
    return this.html;
  }

}
