﻿/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function(){function q(d,e){function b(a){return e?e.contains(a)&&a.getAscendant("table",!0).equals(e):!0}function c(b){0<f.length||b.type!=CKEDITOR.NODE_ELEMENT||!H.test(b.getName())||b.getCustomData("selected_cell")||(CKEDITOR.dom.element.setMarker(a,b,"selected_cell",!0),f.push(b))}var f=[],a={};if(!d)return f;for(var h=d.getRanges(),k=0;k<h.length;k++){var g=h[k];if(g.collapsed)(g=g.getCommonAncestor().getAscendant({td:1,th:1},!0))&&b(g)&&f.push(g);else{var g=new CKEDITOR.dom.walker(g),l;for(g.guard=
c;l=g.next();)l.type==CKEDITOR.NODE_ELEMENT&&l.is(CKEDITOR.dtd.table)||(l=l.getAscendant({td:1,th:1},!0))&&!l.getCustomData("selected_cell")&&b(l)&&(CKEDITOR.dom.element.setMarker(a,l,"selected_cell",!0),f.push(l))}}CKEDITOR.dom.element.clearAllMarkers(a);return f}function t(d,e){for(var b=G(d)?d:q(d),c=b[0],f=c.getAscendant("table"),c=c.getDocument(),a=b[0].getParent(),h=a.$.rowIndex,b=b[b.length-1],k=b.getParent().$.rowIndex+b.$.rowSpan-1,b=new CKEDITOR.dom.element(f.$.rows[k]),h=e?h:k,a=e?a:b,
b=CKEDITOR.tools.buildTableMap(f),f=b[h],h=e?b[h-1]:b[h+1],b=b[0].length,c=c.createElement("tr"),k=0;f[k]&&k<b;k++){var g;1<f[k].rowSpan&&h&&f[k]==h[k]?(g=f[k],g.rowSpan+=1):(g=(new CKEDITOR.dom.element(f[k])).clone(),g.removeAttribute("rowSpan"),g.appendBogus(),c.append(g),g=g.$);k+=g.colSpan-1}e?c.insertBefore(a):c.insertAfter(a);return c}function D(d){if(d instanceof CKEDITOR.dom.selection){var e=d.getRanges(),b=q(d),c=b[0].getAscendant("table"),f=CKEDITOR.tools.buildTableMap(c),a=b[0].getParent().$.rowIndex,
b=b[b.length-1],h=b.getParent().$.rowIndex+b.$.rowSpan-1,b=[];d.reset();for(d=a;d<=h;d++){for(var k=f[d],g=new CKEDITOR.dom.element(c.$.rows[d]),l=0;l<k.length;l++){var r=new CKEDITOR.dom.element(k[l]),n=r.getParent().$.rowIndex;1==r.$.rowSpan?r.remove():(--r.$.rowSpan,n==d&&(n=f[d+1],n[l-1]?r.insertAfter(new CKEDITOR.dom.element(n[l-1])):(new CKEDITOR.dom.element(c.$.rows[d+1])).append(r,1)));l+=r.$.colSpan-1}b.push(g)}f=c.$.rows;e[0].moveToPosition(c,CKEDITOR.POSITION_BEFORE_START);a=new CKEDITOR.dom.element(f[h+
1]||(0<a?f[a-1]:null)||c.$.parentNode);for(d=b.length;0<=d;d--)D(b[d]);return c.$.parentNode?a:(e[0].select(),null)}d instanceof CKEDITOR.dom.element&&(c=d.getAscendant("table"),1==c.$.rows.length?c.remove():d.remove());return null}function B(d,e){for(var b=d.getParent().$.cells,c=0,f=0;f<b.length;f++){var a=b[f],c=c+(e?1:a.colSpan);if(a==d.$)break}return c-1}function w(d,e){for(var b=e?Infinity:0,c=0;c<d.length;c++){var f=B(d[c],e);if(e?f<b:f>b)b=f}return b}function p(d,e){for(var b=G(d)?d:q(d),
c=b[0].getAscendant("table"),f=w(b,1),b=w(b),a=e?f:b,h=CKEDITOR.tools.buildTableMap(c),c=[],f=[],b=[],k=h.length,g=0;g<k;g++)c.push(h[g][a]),f.push(e?h[g][a-1]:h[g][a+1]);for(g=0;g<k;g++)c[g]&&(1<c[g].colSpan&&f[g]==c[g]?(h=c[g],h.colSpan+=1):(a=new CKEDITOR.dom.element(c[g]),h=a.clone(),h.removeAttribute("colSpan"),h.appendBogus(),h[e?"insertBefore":"insertAfter"].call(h,a),b.push(h),h=h.$),g+=h.rowSpan-1);return b}function m(d,e){var b=d.getStartElement().getAscendant({td:1,th:1},!0);if(b){var c=
b.clone();c.appendBogus();e?c.insertBefore(b):c.insertAfter(b)}}function v(d){if(d instanceof CKEDITOR.dom.selection){var e=d.getRanges(),b=q(d),c=b[0]&&b[0].getAscendant("table"),f;a:{var a=0;f=b.length-1;for(var h={},k,g;k=b[a++];)CKEDITOR.dom.element.setMarker(h,k,"delete_cell",!0);for(a=0;k=b[a++];)if((g=k.getPrevious())&&!g.getCustomData("delete_cell")||(g=k.getNext())&&!g.getCustomData("delete_cell")){CKEDITOR.dom.element.clearAllMarkers(h);f=g;break a}CKEDITOR.dom.element.clearAllMarkers(h);
a=b[0].getParent();(a=a.getPrevious())?f=a.getLast():(a=b[f].getParent(),f=(a=a.getNext())?a.getChild(0):null)}d.reset();for(d=b.length-1;0<=d;d--)v(b[d]);f?x(f,!0):c&&(e[0].moveToPosition(c,CKEDITOR.POSITION_BEFORE_START),e[0].select(),c.remove())}else d instanceof CKEDITOR.dom.element&&(e=d.getParent(),1==e.getChildCount()?e.remove():d.remove())}function x(d,e){var b=d.getDocument(),c=CKEDITOR.document;CKEDITOR.env.ie&&10==CKEDITOR.env.version&&(c.focus(),b.focus());b=new CKEDITOR.dom.range(b);
b["moveToElementEdit"+(e?"End":"Start")](d)||(b.selectNodeContents(d),b.collapse(e?!1:!0));b.select(!0)}function y(d,e,b){d=d[e];if("undefined"==typeof b)return d;for(e=0;d&&e<d.length;e++){if(b.is&&d[e]==b.$)return e;if(e==b)return new CKEDITOR.dom.element(d[e])}return b.is?-1:null}function z(d,e,b){var c=q(d),f;if((e?1!=c.length:2>c.length)||(f=d.getCommonAncestor())&&f.type==CKEDITOR.NODE_ELEMENT&&f.is("table"))return!1;var a;d=c[0];f=d.getAscendant("table");var h=CKEDITOR.tools.buildTableMap(f),
k=h.length,g=h[0].length,l=d.getParent().$.rowIndex,r=y(h,l,d);if(e){var n;try{var C=parseInt(d.getAttribute("rowspan"),10)||1;a=parseInt(d.getAttribute("colspan"),10)||1;n=h["up"==e?l-C:"down"==e?l+C:l]["left"==e?r-a:"right"==e?r+a:r]}catch(x){return!1}if(!n||d.$==n)return!1;c["up"==e||"left"==e?"unshift":"push"](new CKEDITOR.dom.element(n))}e=d.getDocument();var E=l,C=n=0,u=!b&&new CKEDITOR.dom.documentFragment(e),t=0;for(e=0;e<c.length;e++){a=c[e];var p=a.getParent(),w=a.getFirst(),m=a.$.colSpan,
v=a.$.rowSpan,p=p.$.rowIndex,z=y(h,p,a),t=t+m*v,C=Math.max(C,z-r+m);n=Math.max(n,p-l+v);b||(m=a,(v=m.getBogus())&&v.remove(),m.trim(),a.getChildren().count()&&(p==E||!w||w.isBlockBoundary&&w.isBlockBoundary({br:1})||(E=u.getLast(CKEDITOR.dom.walker.whitespaces(!0)),!E||E.is&&E.is("br")||u.append("br")),a.moveChildren(u)),e?a.remove():a.setHtml(""));E=p}if(b)return n*C==t;u.moveChildren(d);d.appendBogus();C>=g?d.removeAttribute("rowSpan"):d.$.rowSpan=n;n>=k?d.removeAttribute("colSpan"):d.$.colSpan=
C;b=new CKEDITOR.dom.nodeList(f.$.rows);c=b.count();for(e=c-1;0<=e;e--)f=b.getItem(e),f.$.cells.length||(f.remove(),c++);return d}function A(d,e){var b=q(d);if(1<b.length)return!1;if(e)return!0;var b=b[0],c=b.getParent(),f=c.getAscendant("table"),a=CKEDITOR.tools.buildTableMap(f),h=c.$.rowIndex,k=y(a,h,b),g=b.$.rowSpan,l;if(1<g){l=Math.ceil(g/2);for(var g=Math.floor(g/2),c=h+l,f=new CKEDITOR.dom.element(f.$.rows[c]),a=y(a,c),r,c=b.clone(),h=0;h<a.length;h++)if(r=a[h],r.parentNode==f.$&&h>k){c.insertBefore(new CKEDITOR.dom.element(r));
break}else r=null;r||f.append(c)}else for(g=l=1,f=c.clone(),f.insertAfter(c),f.append(c=b.clone()),r=y(a,h),k=0;k<r.length;k++)r[k].rowSpan++;c.appendBogus();b.$.rowSpan=l;c.$.rowSpan=g;1==l&&b.removeAttribute("rowSpan");1==g&&c.removeAttribute("rowSpan");return c}function F(d,e){var b=q(d);if(1<b.length)return!1;if(e)return!0;var b=b[0],c=b.getParent(),f=c.getAscendant("table"),f=CKEDITOR.tools.buildTableMap(f),a=y(f,c.$.rowIndex,b),h=b.$.colSpan;if(1<h)c=Math.ceil(h/2),h=Math.floor(h/2);else{for(var h=
c=1,k=[],g=0;g<f.length;g++){var l=f[g];k.push(l[a]);1<l[a].rowSpan&&(g+=l[a].rowSpan-1)}for(f=0;f<k.length;f++)k[f].colSpan++}f=b.clone();f.insertAfter(b);f.appendBogus();b.$.colSpan=c;f.$.colSpan=h;1==c&&b.removeAttribute("colSpan");1==h&&f.removeAttribute("colSpan");return f}var H=/^(?:td|th)$/,G=CKEDITOR.tools.isArray;CKEDITOR.plugins.tabletools={requires:"table,dialog,contextmenu",init:function(d){function e(a){return CKEDITOR.tools.extend(a||{},{contextSensitive:1,refresh:function(a,b){this.setState(b.contains({td:1,
th:1},1)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}})}function b(a,b){var c=d.addCommand(a,b);d.addFeature(c)}var c=d.lang.table,f=CKEDITOR.tools.style.parse;b("cellProperties",new CKEDITOR.dialogCommand("cellProperties",e({allowedContent:"td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",requiredContent:"table",contentTransformations:[[{element:"td",left:function(a){return a.styles.background&&f.background(a.styles.background).color},
right:function(a){a.styles["background-color"]=f.background(a.styles.background).color}},{element:"td",check:"td{vertical-align}",left:function(a){return a.attributes&&a.attributes.valign},right:function(a){a.styles["vertical-align"]=a.attributes.valign;delete a.attributes.valign}}],[{element:"tr",check:"td{height}",left:function(a){return a.styles&&a.styles.height},right:function(a){CKEDITOR.tools.array.forEach(a.children,function(b){b.name in{td:1,th:1}&&(b.attributes["cke-row-height"]=a.styles.height)});
delete a.styles.height}}],[{element:"td",check:"td{height}",left:function(a){return(a=a.attributes)&&a["cke-row-height"]},right:function(a){a.styles.height=a.attributes["cke-row-height"];delete a.attributes["cke-row-height"]}}]]})));CKEDITOR.dialog.add("cellProperties",this.path+"dialogs/tableCell.js");b("rowDelete",e({requiredContent:"table",exec:function(a){a=a.getSelection();(a=D(a))&&x(a)}}));b("rowInsertBefore",e({requiredContent:"table",exec:function(a){a=a.getSelection();a=q(a);t(a,!0)}}));
b("rowInsertAfter",e({requiredContent:"table",exec:function(a){a=a.getSelection();a=q(a);t(a)}}));b("columnDelete",e({requiredContent:"table",exec:function(a){var b=a.getSelection();a=b.getRanges();var c=q(b),d=c[0],e=c[c.length-1],c=d.getAscendant("table"),f=CKEDITOR.tools.buildTableMap(c),n,p,t=[];b.reset();for(var m=0,b=f.length;m<b;m++)for(var u=0,v=f[m].length;u<v;u++)f[m][u]==d.$&&(n=u),f[m][u]==e.$&&(p=u);for(m=n;m<=p;m++)for(u=0;u<f.length;u++)e=f[u],d=new CKEDITOR.dom.element(c.$.rows[u]),
e=new CKEDITOR.dom.element(e[m]),e.$&&(1==e.$.colSpan?e.remove():--e.$.colSpan,u+=e.$.rowSpan-1,d.$.cells.length||t.push(d));p=c.$.rows[0]&&c.$.rows[0].cells;n=new CKEDITOR.dom.element(p[n]||(n?p[n-1]:c.$.parentNode));t.length==b&&(a[0].moveToPosition(c,CKEDITOR.POSITION_AFTER_END),a[0].select(),c.remove());n&&x(n,!0)}}));b("columnInsertBefore",e({requiredContent:"table",exec:function(a){a=a.getSelection();a=q(a);p(a,!0)}}));b("columnInsertAfter",e({requiredContent:"table",exec:function(a){a=a.getSelection();
a=q(a);p(a)}}));b("cellDelete",e({requiredContent:"table",exec:function(a){a=a.getSelection();v(a)}}));b("cellMerge",e({allowedContent:"td[colspan,rowspan]",requiredContent:"td[colspan,rowspan]",exec:function(a,b){b.cell=z(a.getSelection());x(b.cell,!0)}}));b("cellMergeRight",e({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(a,b){b.cell=z(a.getSelection(),"right");x(b.cell,!0)}}));b("cellMergeDown",e({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(a,
b){b.cell=z(a.getSelection(),"down");x(b.cell,!0)}}));b("cellVerticalSplit",e({allowedContent:"td[rowspan]",requiredContent:"td[rowspan]",exec:function(a){x(F(a.getSelection()))}}));b("cellHorizontalSplit",e({allowedContent:"td[colspan]",requiredContent:"td[colspan]",exec:function(a){x(A(a.getSelection()))}}));b("cellInsertBefore",e({requiredContent:"table",exec:function(a){a=a.getSelection();m(a,!0)}}));b("cellInsertAfter",e({requiredContent:"table",exec:function(a){a=a.getSelection();m(a)}}));d.addMenuItems&&
d.addMenuItems({tablecell:{label:c.cell.menu,group:"tablecell",order:1,getItems:function(){var a=d.getSelection(),b=q(a);return{tablecell_insertBefore:CKEDITOR.TRISTATE_OFF,tablecell_insertAfter:CKEDITOR.TRISTATE_OFF,tablecell_delete:CKEDITOR.TRISTATE_OFF,tablecell_merge:z(a,null,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_right:z(a,"right",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_down:z(a,"down",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,
tablecell_split_vertical:F(a,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_horizontal:A(a,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_properties:0<b.length?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED}}},tablecell_insertBefore:{label:c.cell.insertBefore,group:"tablecell",command:"cellInsertBefore",order:5},tablecell_insertAfter:{label:c.cell.insertAfter,group:"tablecell",command:"cellInsertAfter",order:10},tablecell_delete:{label:c.cell.deleteCell,group:"tablecell",
command:"cellDelete",order:15},tablecell_merge:{label:c.cell.merge,group:"tablecell",command:"cellMerge",order:16},tablecell_merge_right:{label:c.cell.mergeRight,group:"tablecell",command:"cellMergeRight",order:17},tablecell_merge_down:{label:c.cell.mergeDown,group:"tablecell",command:"cellMergeDown",order:18},tablecell_split_horizontal:{label:c.cell.splitHorizontal,group:"tablecell",command:"cellHorizontalSplit",order:19},tablecell_split_vertical:{label:c.cell.splitVertical,group:"tablecell",command:"cellVerticalSplit",
order:20},tablecell_properties:{label:c.cell.title,group:"tablecellproperties",command:"cellProperties",order:21},tablerow:{label:c.row.menu,group:"tablerow",order:1,getItems:function(){return{tablerow_insertBefore:CKEDITOR.TRISTATE_OFF,tablerow_insertAfter:CKEDITOR.TRISTATE_OFF,tablerow_delete:CKEDITOR.TRISTATE_OFF}}},tablerow_insertBefore:{label:c.row.insertBefore,group:"tablerow",command:"rowInsertBefore",order:5},tablerow_insertAfter:{label:c.row.insertAfter,group:"tablerow",command:"rowInsertAfter",
order:10},tablerow_delete:{label:c.row.deleteRow,group:"tablerow",command:"rowDelete",order:15},tablecolumn:{label:c.column.menu,group:"tablecolumn",order:1,getItems:function(){return{tablecolumn_insertBefore:CKEDITOR.TRISTATE_OFF,tablecolumn_insertAfter:CKEDITOR.TRISTATE_OFF,tablecolumn_delete:CKEDITOR.TRISTATE_OFF}}},tablecolumn_insertBefore:{label:c.column.insertBefore,group:"tablecolumn",command:"columnInsertBefore",order:5},tablecolumn_insertAfter:{label:c.column.insertAfter,group:"tablecolumn",
command:"columnInsertAfter",order:10},tablecolumn_delete:{label:c.column.deleteColumn,group:"tablecolumn",command:"columnDelete",order:15}});d.contextMenu&&d.contextMenu.addListener(function(a,b,c){return(a=c.contains({td:1,th:1},1))&&!a.isReadOnly()?{tablecell:CKEDITOR.TRISTATE_OFF,tablerow:CKEDITOR.TRISTATE_OFF,tablecolumn:CKEDITOR.TRISTATE_OFF}:null})},getCellColIndex:B,insertRow:t,insertColumn:p,getSelectedCells:q};CKEDITOR.plugins.add("tabletools",CKEDITOR.plugins.tabletools)})();
CKEDITOR.tools.buildTableMap=function(q,t,D,B,w){q=q.$.rows;D=D||0;B="number"===typeof B?B:q.length-1;w="number"===typeof w?w:-1;var p=-1,m=[];for(t=t||0;t<=B;t++){p++;!m[p]&&(m[p]=[]);for(var v=-1,x=D;x<=(-1===w?q[t].cells.length-1:w);x++){var y=q[t].cells[x];if(!y)break;for(v++;m[p][v];)v++;for(var z=isNaN(y.colSpan)?1:y.colSpan,y=isNaN(y.rowSpan)?1:y.rowSpan,A=0;A<y&&!(t+A>B);A++){m[p+A]||(m[p+A]=[]);for(var F=0;F<z;F++)m[p+A][v+F]=q[t].cells[x]}v+=z-1;if(-1!==w&&v>=w)break}}return m};