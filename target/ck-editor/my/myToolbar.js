﻿/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
Toolbar=function(c){this._editorName=c;CKEDITOR.on("instanceReady",this._initCommandListeners,this)};
Toolbar.prototype={executeSimpleCommand:function(c){this._getEditorInstance().execCommand(c)},executeStyleCommand:function(c,b){0!=b&&this._getEditorInstance().execCommand(c,b)},_getEditorInstance:function(){return CKEDITOR.instances[this._editorName]},_initCommandListeners:function(){var c=this._getEditorInstance(),b=document.getElementsByTagName("button");Array.forEach(b,function(a){var b=c.getCommand(a.id);b&&(b.on("state",function(){this._setUiAccordingToState(b,a)},this),this._setUiAccordingToState(b,
a))},this);b=document.getElementsByTagName("select");Array.forEach(b,function(a){var b=c.getCommand(a.id);b.on("state",function(){this._setSelectionAccordingToState(b,a)},this)},this)},_setSelectionAccordingToState:function(c,b){var a=c.state;a.indexOf&&-1<a.indexOf("rgb")&&(a=String.rgbToHex(a));if(a==CKEDITOR.TRISTATE_OFF||a==CKEDITOR.TRISTATE_DISABLED)a=0;b.value=a},_setUiAccordingToState:function(c,b){var a;switch(c.state){case CKEDITOR.TRISTATE_DISABLED:a="red";break;case CKEDITOR.TRISTATE_OFF:a=
"#ddd";break;case CKEDITOR.TRISTATE_ON:a="orange";break;default:throw"there is no such command state";}b.style.backgroundColor=a}};