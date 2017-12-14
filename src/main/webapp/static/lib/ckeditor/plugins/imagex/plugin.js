CKEDITOR.plugins.add('imagex', {
	init : function(editor) {
		var pluginName = "imagex";
		//
		editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
		editor.ui.addButton(pluginName, {
			label : '选择/上传图片',
			command : pluginName,
			icon : this.path + 'images/image.png',
			click : function(editor) {
				var handler = CKEDITOR.config.handlers[pluginName];
				if (handler) {
					handler(editor);
				} else {
					editor.insertHtml("<b>imagex handler</b>");
				}
			}
		});
		CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/selectImage.js');
	}
});