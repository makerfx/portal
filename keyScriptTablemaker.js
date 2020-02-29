let record = $("#foo").text();
let res = JSON.parse(record);
$("#foo").hide();

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;
console.log(dateTime);


let table = new Tabulator("#example-table", {
  height: "1000px",
  
  data: res,
  columns: [
    { title: "UID", field: "userID" },
    { title: "NAME", field: "name" },
    { title: "CARD-ID", field: "cardID" },
    {
      title: "STATUS",
      field: "status",
      align: "center",
      formatter: "tickCross"
    }
  ],
  rowFormatter: function(row) {
    var data = row.getData(); //get data object for row

    if (data.col == "blue") {
      row.getElement().style.backgroundColor = "#A6A6DF"; //apply css change to row element
    }
  },
  rowClick: function(e, row) {
    console.log(row.getData());
    let record = row.getData();
    let conf = confirm(
      "Do you wish to edit " + record.name + " ?"
    );
    if (conf == true) {
      console.log("pressed ok");
      window.open("RECORDS=EDITREADY?editIndex=" + record.userID, "_top");
    } else {
      console.log("pressed cancel");
    }
  }
});

$("#download-csv").click(function() {
  table.download("csv", "data.csv");
});

$("#download-json").click(function() {
  table.download("json", "data.json");
});

$("#download-xlsx").click(function() {
  table.download("xlsx", "data.xlsx");
});

$("#download-pdf").click(function() {
  table.download("pdf", "data.pdf", {
    orientation: "portrait",
    title: "Dynamics Quotation Report"
  });
});

$("#download-html").click(function() {
  table.download("html", "data.html", {
    style: true
  });
});

$("#download-records").click(function() {
  //window.open("/RECORDS=PRINT?", "_top");
  $.get("/RECORDS=PRINT?", function(data, status) {
    var text = data,
      blob = new Blob([text], { type: "text/plain" }),
      anchor = document.createElement("a");

    anchor.download = "records" + dateTime + ".txt";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = [
      "text/plain",
      anchor.download,
      anchor.href
    ].join(":");
    anchor.click();
  });
});