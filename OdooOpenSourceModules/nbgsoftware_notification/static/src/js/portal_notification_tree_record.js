odoo.define('nbgsoftware_notification.portal_notification_tree_record', function (require) {
"use strict";

var publicWidget = require('web.public.widget');
var PortalSidebar = require('portal.PortalSidebar');
var rpc = require('web.rpc');

var isTitleSortClicked = false;
var isContentSortClicked = false;
var isDateSortClicked = false;

publicWidget.registry.app_action  = PortalSidebar.extend({
    selector: '.portal-notification-container',
    events: {
        'click .row-notification': '_onNotificationClicked',
        'click #portal-notification-title-header': '_onPortalNotificationTitleSort',
        'click #portal-notification-content-header': '_onPortalNotificationContentSort',
        'click #portal-notification-date-header': '_onPortalNotificationDateSort',
        'click #portal-notification-author-header': '_onPortalNotificationAuthorSort',
        'keyup .portalNotificationInputSearch': '_onPortalNotificationInputSearch',
        'click .portal-notification-checkbox-all': '_onCheckboxAllClicked',
        'click .portal-notification-checkbox': '_onCheckboxClicked',
        'click #portal-notification-read-item': '_onPortalNotificationReadClicked',
        'click #portal-notification-unread-item': '_onPortalNotificationUnreadClicked',
    },

    start: function () {
        var def = this._super.apply(this, arguments);
        const tagsElementsClasses = document.getElementsByClassName("portal_notification_tag_ids");
        for(let i = 0; i < tagsElementsClasses.length; i++){
             let tagsElementString = tagsElementsClasses[i].innerText;
             let tagsArray = tagsElementString.split(",");
             console.log(tagsArray);
        }
        return def;
    },

    _onNotificationClicked: function (event) {
       let isCheckboxClicked = $(event.target).hasClass('portal-notification-checkbox');

       if(!isCheckboxClicked){
         let record = event.currentTarget.innerText;
         const words = record.split('\t');

         rpc.query({
              model:'is.read.notification',
              method:'update_is_read_notification',
              args:[Number(words[0])],
         });

         rpc.query({
            model: 'is.read.notification',
            method: 'get_notifications_data',
            args:[Number(words[0])],
         }).then(function(data){
           if(data){
               const container = document.createElement('div');
               container.id = "notification-root";
               container.innerHTML = `<div class="notification-container" style="position:absolute; background-color:rgba(0,0,0,0.3); height:100vh; width:100vw; display:flex; justify-content: center; align-items: center; top:0;">
                 <div class="wrapper" style="background-color:#fff; border-radius:8px; padding:20px 40px; max-width:80%; min-width: 50%;">
                   <div class="heading-wrapper" style="display:flex; justify-content: space-between; align-items: center;">
                      <h2 class="title" style="margin:auto; word-wrap: break-word; white-space: pre-wrap; max-width: 80%;">${data[0].name}</h2>
                      <button class="close-button" onclick="window.location.reload();" style="min-width: 88px; background-color:#A3B9E2; border:0; border-radius: 5px; box-shadow: 0 2px 4px rgb(0 0 0 / 20%); color:white; padding: 6px 20px; font-size: 14px;">閉じる</button>
                   </div>
                   <div class="content" style="font-size:16px; margin-top:16px; word-wrap: break-word; overflow-wrap: break-word; overflow-y: scroll; max-height: 68vh;">${data[0].content}</div>
                   <div class="footer-wrapper" style="display:flex; justify-content: space-between; align-items: center; margin-top: 40px;">
                     <h6 class="notification-date" style="font-size:14px;">${data[0].create_notification_date_time}</h6>
                     <h6 class="notification_author" style="font-size:14px; color: darkgreen;">${words[4]}</h6>
                   </div>
                 </div>
               </div>`;

               document.body.appendChild(container);
           }
         });
       }
    },

    // sort notifications when click title
    _onPortalNotificationTitleSort: function(event){
        let table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("portalNotificationTable");
        if(!isTitleSortClicked){
          isTitleSortClicked = true;
          switching = true;
          while (switching) {
            switching = false;
            rows = table.rows;

             for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("td")[1];
                y = rows[i + 1].getElementsByTagName("td")[1];

                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
             }
             if (shouldSwitch) {
                 rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                 switching = true;
             }
          }
        }else{
           isTitleSortClicked = false;
           switching = true;
           while (switching) {
             switching = false;
             rows = table.rows;

              for (i = 1; i < (rows.length - 1); i++) {
                 shouldSwitch = false;
                 x = rows[i].getElementsByTagName("td")[1];
                 y = rows[i + 1].getElementsByTagName("td")[1];

                 if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                     shouldSwitch = true;
                     break;
                 }
              }
              if (shouldSwitch) {
                  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                  switching = true;
              }
           }
        }
    },

    // sort notifications when click content
    _onPortalNotificationContentSort: function(event){
        let table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("portalNotificationTable");
        if(!isContentSortClicked){
           isContentSortClicked = true;
           switching = true;
           while (switching) {
             switching = false;
             rows = table.rows;

              for (i = 1; i < (rows.length - 1); i++) {
                 shouldSwitch = false;
                 x = rows[i].getElementsByTagName("td")[2];
                 y = rows[i + 1].getElementsByTagName("td")[2];

                 if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                     shouldSwitch = true;
                     break;
                 }
              }
              if (shouldSwitch) {
                  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                  switching = true;
              }
           }
        }else{
            isContentSortClicked = false;
            switching = true;
            while (switching) {
              switching = false;
              rows = table.rows;

               for (i = 1; i < (rows.length - 1); i++) {
                  shouldSwitch = false;
                  x = rows[i].getElementsByTagName("td")[2];
                  y = rows[i + 1].getElementsByTagName("td")[2];

                  if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                      shouldSwitch = true;
                      break;
                  }
               }
               if (shouldSwitch) {
                   rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                   switching = true;
               }
            }
        }
    },

    // sort notifications when click date
    _onPortalNotificationDateSort: function(event){
        let table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("portalNotificationTable");
        if(!isDateSortClicked){
           isDateSortClicked = true;
           switching = true;
           while (switching) {
             switching = false;
             rows = table.rows;

              for (i = 1; i < (rows.length - 1); i++) {
                 shouldSwitch = false;
                 x = rows[i].getElementsByTagName("td")[3];
                 y = rows[i + 1].getElementsByTagName("td")[3];

                 if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                     shouldSwitch = true;
                     break;
                 }
              }
              if (shouldSwitch) {
                  rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                  switching = true;
              }
           }
        }else{
             isDateSortClicked = false;
             switching = true;
             while (switching) {
               switching = false;
               rows = table.rows;

               for (i = 1; i < (rows.length - 1); i++) {
                   shouldSwitch = false;
                   x = rows[i].getElementsByTagName("td")[3];
                   y = rows[i + 1].getElementsByTagName("td")[3];

                   if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                       shouldSwitch = true;
                       break;
                   }
               }
               if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
               }
             }
        }
    },

    // sort notifications when click author
    _onPortalNotificationAuthorSort: function(event){
        let table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("portalNotificationTable");
        switching = true;
        while (switching) {
          switching = false;
          rows = table.rows;

           for (i = 1; i < (rows.length - 1); i++) {
              shouldSwitch = false;
              x = rows[i].getElementsByTagName("td")[4];
              y = rows[i + 1].getElementsByTagName("td")[4];

              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                  shouldSwitch = true;
                  break;
              }
           }
           if (shouldSwitch) {
               rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
               switching = true;
           }
        }
    },

    // notifications search function
    _onPortalNotificationInputSearch: function(event){
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("portalNotificationSearch");
        filter = input.value.toUpperCase();
        table = document.getElementById("portalNotificationTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
           td = tr[i].getElementsByTagName("td")[1];
           if (td) {
              txtValue = td.textContent || td.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                   tr[i].style.display = "";
              } else {
                   tr[i].style.display = "none";
              }
           }
        }
    },

    // enable/disable all notification checkboxes when clicked
    _onCheckboxAllClicked: function(event){
        // show or hide button action when click checkbox
        let actionBtn = document.querySelector(".portal-notification-action-menu-container");
        if($('.portal-notification-checkbox-all').is(":checked")){
           actionBtn.style.display = "inline-block";
           $('.portal-notification-checkbox').prop('checked', true);
        }else{
           actionBtn.style.display = "none";
           $('.portal-notification-checkbox').prop('checked', false);
        }
    },

    // enable/disable checkbox when clicked
    _onCheckboxClicked: function(event){
        let actionBtn = document.querySelector(".portal-notification-action-menu-container");
        if($('.portal-notification-checkbox').is(":checked")){
           actionBtn.style.display = "inline-block";
        }else{
           actionBtn.style.display = "none";
        }
    },

    // mark notifications become READ when clicked
    _onPortalNotificationReadClicked: function(event){
        const notificationsListChecked = [];
        let table, rows, notificationCheckbox, notificationId;
        table = document.getElementById("portalNotificationTable");
        rows = table.rows;
        for (let i = 1; i < (rows.length); i++) {
            notificationId = rows[i].getElementsByTagName("td")[0].innerText;
            notificationCheckbox = rows[i].getElementsByTagName("input")[0];
            if(notificationCheckbox.checked){
                notificationsListChecked.push(parseInt(notificationId));
            }
        }
        if(notificationsListChecked){
            rpc.query({
                model:'is.read.notification',
                method:'update_list_read_notification',
                args:[notificationsListChecked],
            }).then(function(){
                window.location.reload();
            });
        }
    },

    // mark notifications become UNREAD when clicked
    _onPortalNotificationUnreadClicked: function(event){
        const notificationsListChecked = [];
        let table, rows, notificationCheckbox, notificationId;
        table = document.getElementById("portalNotificationTable");
        rows = table.rows;
        for (let i = 1; i < (rows.length); i++) {
            notificationId = rows[i].getElementsByTagName("td")[0].innerText;
            notificationCheckbox = rows[i].getElementsByTagName("input")[0];
            if(notificationCheckbox.checked){
                notificationsListChecked.push(parseInt(notificationId));
            }
        }
        if(notificationsListChecked){
            rpc.query({
                model:'is.read.notification',
                method:'delete_list_unread_notification',
                args:[notificationsListChecked],
            }).then(function(){
                window.location.reload();
            });
        }
    },
});
});
