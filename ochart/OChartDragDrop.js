/**
 * Description
 */
Ext.define( 'Ext.ux.ochart.OChartDragDrop', {
    extend: 'Ext.tree.plugin.TreeViewDragDrop',
    alias: 'plugin.ochartdragdrop',

    uses: [
        'Ext.ux.ochart.OChartDragZone',
        'Ext.ux.ochart.OChartDropZone'
    ],

    onViewRender : function(view) {
        var me = this,
            scrollEl;

        if (me.enableDrag) {
            if (me.containerScroll) {
                scrollEl = view.getEl();
            }
            me.dragZone = new Ext.ux.ochart.OChartDragZone({
                view: view,
                ddGroup: me.dragGroup || me.ddGroup,
                dragText: me.dragText,
                displayField: me.displayField,
                repairHighlightColor: me.nodeHighlightColor,
                repairHighlight: me.nodeHighlightOnRepair,
                scrollEl: scrollEl
            });
        }

        if (me.enableDrop) {
            me.dropZone = new Ext.ux.ochart.OChartDropZone({
                view: view,
                ddGroup: me.dropGroup || me.ddGroup,
                allowContainerDrops: me.allowContainerDrops,
                appendOnly: me.appendOnly,
                allowParentInserts: me.allowParentInserts,
                expandDelay: me.expandDelay,
                dropHighlightColor: me.nodeHighlightColor,
                dropHighlight: me.nodeHighlightOnDrop,
                sortOnDrop: me.sortOnDrop,
                containerScroll: me.containerScroll
            });
        }
    }
} );
