﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
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
  const response = await fetch("https://api.citra-emu.org/lobby");
  const data = await response.json();
  return data.rooms;
}
