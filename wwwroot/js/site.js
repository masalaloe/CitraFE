// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let lobbyData = null;
let grid;
let proxy = "https://fast-dawn-89938.herokuapp.com/";

const columns = [
  {
    caption: "Room Name",
    dataField: "name",
    dataType: "string",
  },
  {
    caption: "IP Address",
    dataField: "address",
    dataType: "string",
  },
  {
    caption: "Port",
    dataField: "port",
    dataType: "string",
  },
  {
    caption: "Players",
    dataField: "maxPlayers",
    dataType: "string",
    calculateCellValue: function (rowData) {
      let playersCount = rowData.players.length;
      return playersCount + " / " + rowData.maxPlayers;
    },
  },
  {
    caption: "Game",
    dataField: "preferredGameName",
    dataType: "string",
  },
  {
    caption: "Owner",
    dataField: "owner",
    dataType: "string",
  },
  {
    caption: "HasPassword?",
    dataField: "hasPassword",
    dataType: "boolean",
    falseText: "No",
    trueText: "Yes",
  },
];

$(function () {
  $("#dataGrid").dxDataGrid({
    dataSource: [],
    keyExpr: "externalGuid",
    filterRow: { visible: true },
    searchPanel: { visible: true },
    loadPanel: {
      enabled: true,
    },
    columns: columns,
    columnAutoWidth: true,
    allowColumnResizing: true,
    columnResizingMode: "widget",
    showBorders: true,
    paging: {
      enabled: true,
      pageSize: 10,
    },
    export: {
      enabled: true,
      allowExportSelectedData: true,
      fileName: "ExportedFile",
    },
    pager: {
      showPageSizeSelector: true,
      allowedPageSizes: [10, 20, 50],
      showNavigationButtons: true,
      showInfo: true,
      infoText: "Page {0}. Total: {1} ({2} items)",
    },
    masterDetail: {
      enabled: true,
      // autoExpandAll: true,
      template: function (container, options) {
        var data = options.data;
        let playerData = data.players;
        $("<div>")
          .dxDataGrid({
            columnAutoWidth: true,
            showBorders: true,
            columns: [
              {
                dataField: "nickname",
                dataType: "string",
                caption: "Player Name",
              },
              {
                dataField: "gameName",
                dataType: "string",
                caption: "Game Name",
              },
            ],
            dataSource: playerData,
          })
          .appendTo(container);
      },
    },
    onToolbarPreparing: function (e) {
      let gridToolbarItems = e.toolbarOptions.items;

      $.each(gridToolbarItems, function (_, item) {
        if (item.name === "searchPanel") {
          // Change the item options here
          console.log(item);
          item.location = "before";
        }
      });

      gridToolbarItems.push({
        location: "after",
        widget: "dxButton",
        options: {
          icon: "refresh",
          text: "Refresh Data",
          onClick() {
            grid.refresh();
          },
        },
      });
    },
    // remoteOperations: {
    //   filtering: true,
    //   paging: true,
    //   sorting: true,
    //   groupPaging: true,
    //   grouping: true,
    //   summary: true,
    // },
  });

  grid = $("#dataGrid").dxDataGrid("instance");

  getData().then((data) => {
    lobbyData = data; // fetched movies
    grid.option("dataSource", lobbyData);
  });
});

async function getData() {
  let url = proxy + "https://api.citra-emu.org/lobby";
  //   let url = "https://api.citra-emu.org/lobby";
  var requestOptions = {
    mode: "cors",
    headers: {},
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();
  return data.rooms;
}
