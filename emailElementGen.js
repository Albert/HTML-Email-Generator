var elements = {
  table:
    {
      Width: "600px",
      Color: "#ffffff"
    },
  font:
    {
      Size: "11px",
      Color: "#000000",
      Face: "helvetica, arial, sans-serif"
    },
  link:
    {
      Href: "http://www.example.com",
      Size: "11px",
      Color: "#0000ff",
      Face: "helvetica, arial, sans-serif"
    }
};

function outputTable() {
  var output = "";
  output = output + '<table cellpadding="0" cellspacing="0" border="0" width="' +elements.table.Width + '" bgcolor="' + elements.table.Color + '">\n';
  output = output + '  <tr>\n';
  output = output + '    <td>\n';
  output = output + '    </td>\n';
  output = output + '  </tr>\n';
  output = output + '</table>';
  $("#tableOutput").val(output);
}

function outputFont() {
  var output = '<font style="font-size: ' + elements.font.Size + '; color: ' + elements.font.Color + '; font-family: ' + elements.font.Face + ';" size="' + GetHTMLFontSize(parseInt(elements.font.Size)) + '" face="' + elements.font.Face + '" color="' + elements.font.Color + '">\n</font>';
  $("#fontOutput").val(output);
}

function outputLink() {
    var output = '<a href="' + elements.link.Href + '" style="font-size: ' + elements.link.Size + '; color: ' + elements.link.Color + '; font-family: ' + elements.link.Face + ';"><font style="font-size: ' + elements.link.Size + '; color: ' + elements.link.Color + '; font-family: ' + elements.link.Face + ';" size="' + GetHTMLFontSize(parseInt(elements.link.Size)) + '" face="' + elements.link.Face + '" color="' + elements.link.Color + '"></font></a>';
  $("#linkOutput").val(output);
}

function GetHTMLFontSize(pxNum) {
  var myReturn = 0;
  if (pxNum <= 10) {
    myReturn = 1;
  } else if (pxNum <= 12) {
    myReturn = 2;
  } else if (pxNum <= 16) {
    myReturn = 3;
  } else if (pxNum <= 18) {
    myReturn = 4;
  } else if (pxNum <= 24) {
    myReturn = 5;
  } else if (pxNum <= 32) {
    myReturn = 6;
  } else {
    myReturn = 7;
  }
  return myReturn;
}

function populateFromJson() {
  $('input').each(function () {
    var $this = $(this);
    var elAndProperty = splitIntoElAndProperty($this.attr("id"));
    var element = elAndProperty[0];
    var property = elAndProperty[1];
    $this.val(elements[element][property]);
  });
  outputTable();
  outputFont();
  outputLink();
}

$('document').ready(function () {
  populateFromJson();

  $('input').change(function () {
    var $this = $(this);
    var elAndProperty = splitIntoElAndProperty($this.attr("id"));
    var element = elAndProperty[0];
    var property = elAndProperty[1];
    elements[element][property] = $this.val();
    outputTable();
    outputFont();
    outputLink();
  });
});

function splitIntoElAndProperty(inputId) {
  var myReturn = [];
  _.each(elements, function (el) {
    if (inputId.match(el.name)) {
      var inputProperty = inputId.replace(el.name, "");
      _.each(el, function (value, property) {
        if (inputProperty.match(property)) {
          myReturn = [inputProperty.replace(property, ""), property];
        }
      });
    }
  });
  return myReturn;
}