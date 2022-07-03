// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let lobbyData = null;
let grid;

$(function () {
  $("#dataGrid").dxDataGrid({
    dataSource: [],
    keyExpr: "externalGuid",
    filterRow: { visible: true },
    searchPanel: { visible: true },
    columns: ["name", "maxPlayers", "address", "port", "preferredGameName", "owner", "hasPassword"],
    remoteOperations: {
      filtering: true,
      paging: true,
      sorting: true,
      groupPaging: true,
      grouping: true,
      summary: true,
    },
  });

  grid = $("#dataGrid").dxDataGrid("instance");

  getData().then((data) => {
    lobbyData = data; // fetched movies
    grid.option("dataSource", lobbyData);
  });

  $("#buttonContainer").dxButton({
    text: "Click me!",
    onClick: function () {
      alert("Hello world!");
    },
  });
});

async function getData() {
  let url = "https://cors-anywhere.herokuapp.com/https://api.citra-emu.org/lobby";
  //   let url = "https://api.citra-emu.org/lobby";
  var requestOptions = {
    mode: "cors",
    headers: {},
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return data.rooms;
}
