// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// MIT License. See license.txt
/* globals jscolor */
frappe.provide("frappe.website_theme");
$.extend(frappe.website_theme, {
	color_variables: ["background_color", "top_bar_color", "top_bar_text_color",
		"footer_color", "footer_text_color", "text_color", "link_color"]
});

frappe.ui.form.on('Website Theme', {
	onload_post_render(frm) {
		frappe.require('assets/frappe/js/lib/jscolor/jscolor.js', function() {
			$.each(frappe.website_theme.color_variables, function(i, v) {
				$(frm.fields_dict[v].input).addClass('color {required:false,hash:true}');
			});
			jscolor.bind();
		});
	},
	refresh(frm) {
		frm.set_intro(__('Default theme is set in {0}', ['<a href="#Form/Website Settings">'
			+ __('Website Settings') + '</a>']));

		frm.toggle_display(["module", "custom"], !frappe.boot.developer_mode);

		if (!frm.doc.custom && !frappe.boot.developer_mode) {
			frm.set_read_only();
			frm.disable_save();
		} else {
			frm.enable_save();
		}
	},
	generate_theme(frm) {
		frappe.call('frappe.website.doctype.website_theme.website_theme.generate_bootstrap_theme', {
			website_theme: frm.doc.name
		}).then(r => {
			frm.refresh();
		});
	}
})
