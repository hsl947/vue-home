(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5812c93f"],{"5e95":function(t,e,o){"use strict";var a=o("b002"),r=o.n(a);r.a},b002:function(t,e,o){},d651:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("mu-container",[o("mu-appbar",{staticStyle:{width:"100%"},attrs:{color:"primary"}},[o("mu-button",{attrs:{slot:"left",icon:"",onclick:"window.history.back()"},slot:"left"},[o("mu-icon",{attrs:{value:"arrow_back"}})],1),o("span",[t._v("添加")])],1),o("mu-form",{ref:"form",staticClass:"mu-demo-form pt70",attrs:{model:t.formData}},[o("mu-form-item",{attrs:{label:"标题","help-text":"",prop:"title",rules:t.titleRules}},[o("mu-text-field",{attrs:{prop:"title",placeholder:"请输入标题"},model:{value:t.formData.title,callback:function(e){t.$set(t.formData,"title",e)},expression:"formData.title"}})],1),o("mu-form-item",{attrs:{label:"描述",prop:"description",rules:t.descriptionRules}},[o("mu-text-field",{attrs:{prop:"description",placeholder:"请输入文章描述"},model:{value:t.formData.description,callback:function(e){t.$set(t.formData,"description",e)},expression:"formData.description"}})],1),o("mu-form-item",{attrs:{label:"内容",prop:"content"}},[o("quill-editor",{ref:"myQuillEditor",attrs:{options:t.editorOption},on:{change:function(e){t.onEditorChange(e)}},model:{value:t.formData.content,callback:function(e){t.$set(t.formData,"content",e)},expression:"formData.content"}})],1),o("mu-form-item",[o("mu-button",{attrs:{color:"primary"},on:{click:t.submit}},[t._v("提交")]),o("mu-button",{on:{click:t.clear}},[t._v("重置")])],1)],1)],1)],1)},r=[],n=(o("a481"),o("cadf"),o("551c"),o("097d"),o("953d")),i={name:"blog_add",components:{quillEditor:n["quillEditor"]},data:function(){return{editorOption:{placeholder:"请输入内容"},formData:{},titleRules:[{validate:function(t){return!!t},message:"标题不能为空"}],descriptionRules:[{validate:function(t){return!!t},message:"描述不能为空"}],contentRules:[{validate:function(t){return!!t},message:"内容不能为空"}]}},filters:{},methods:{submit:function(){var t=this;this.$refs.form.validate().then(function(e){e&&(t.formData.time=new Date,t.$axios.post("/admin/add",t.formData).then(function(e){200==e.status&&(t.$toast.success(e.message),t.$router.replace({path:"/admin"}))}))})},clear:function(){this.$refs.form.clear(),this.formData={}},onEditorChange:function(t){t.quill;var e=t.html,o=t.text;console.log(o),console.log("editor change!",e),this.formData.content=e}},created:function(){this.$progress.start()},mounted:function(){this.$progress.done()}},s=i,l=(o("5e95"),o("2877")),c=Object(l["a"])(s,a,r,!1,null,null,null);c.options.__file="add.vue";e["default"]=c.exports}}]);