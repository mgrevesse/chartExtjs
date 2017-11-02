Ext.Loader.config = {
    enabled: true,
    paths:{
        'Ext.ux.ochart': 'ochart/',
        'OChart.example': 'example/'
    }
};

Ext.define( 'ExamplesStore', {
    extend: 'Ext.data.TreeStore',

    clearOnLoad: true,
    autoLoad: true,

    fields:[
        {name: 'title'},
        {name: 'panel'}
    ],

    proxy: {
        type: 'ajax',
        url: 'examples.json'
    }
} );

Ext.define( 'OViewport', {
    extend: 'Ext.container.Viewport',
    layout: 'border',

    itemId: 'mainView',
    lineWeight: 1,
    lineColor: '000000',
    levelSpacing: 20,
    nodeSpacing: 10,
    readOnly: false,
    rootVisible: false,
    allowContainerDrop: true,
    toolsVisible: true,

    initComponent: function(){
        var me = this;

        me.addEvents('changelineweight',
            'changelinecolor',
            'changelevelspace',
            'changeitemspace',
            'changereadonly',
            'changerootvisible',
            'changecontainerdrop',
            'changetools'
        );
        Ext.apply(me,{
            items:[
                {
                    xtype: 'treepanel',
                    itemId: 'pnmenu',
                    title: 'Samples Menu',
                    region: 'west',
                    flex: 0.2,
                    collapsible: true,
                    split: true,
                    rootVisible: false,
                    store: Ext.create('ExamplesStore'),
                    displayField: 'title',
                    listeners: {
                        itemclick: function(view, record){
                            var panel = view.up('viewport').down('#pnsamples');
                            panel.removeAll(true);
                            panel.add(Ext.create(record.get('panel')));
                        }
                    }
                },
                {
                    xtype: 'panel',
                    itemId: 'pnsamples',
                    region: 'center',
                    flex: 0.8,
                    layout: 'fit',
                    loader     : {
                        url     : 'info.html',
                        autoLoad: true
                    },
                    tbar: {
                        xtype: 'toolbar',
                        items: [
                            {
                                text: 'Lines',
                                defaults: {
                                    labelSeparator: ''
                                },
                                menu: {
                                    plain: true,
                                    items: [
                                        {
                                            text: 'Line Weight',
                                            menu: {
                                                plain: true,
                                                items: [
                                                    {text: 1},
                                                    {text: 2},
                                                    {text: 3},
                                                    {text: 4},
                                                    {text: 5},
                                                    {text: 6}
                                                ],
                                                listeners: {
                                                    scope: me,
                                                    click: function(menu, item){
                                                        this.lineWeight = parseInt(item.text);
                                                        this.fireEvent('changelineweight', this, this.lineWeight);
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            text: 'Line Color',
                                            menu: Ext.create('Ext.menu.ColorPicker', {
                                                value: me.lineColor,
                                                listeners: {
                                                    scope: me,
                                                    select: function(picker, color){
                                                        this.lineColor = color;
                                                        this.fireEvent('changelinecolor', this, color);
                                                    }
                                                }
                                            })

                                        }
                                    ]
                                }
                            },
                            {
                                text: 'Spacing',
                                defaults: {
                                    labelSeparator: ''
                                },
                                menu: {
                                    plain: true,
                                    items: [
                                        {
                                            text: 'Level Spacing',
                                            menu: {
                                                plain: true,
                                                items: [
                                                    {text: 20},
                                                    {text: 30},
                                                    {text: 40},
                                                    {text: 50},
                                                    {text: 60},
                                                    {text: 70}
                                                ],
                                                listeners: {
                                                    scope: me,
                                                    click: function(menu, item){
                                                        this.levelSpacing = parseInt(item.text);
                                                        this.fireEvent('changelevelspace', this, this.levelSpacing);
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            text: 'Item Spacing',
                                            menu: {
                                                plain: true,
                                                items: [
                                                    {text: 10},
                                                    {text: 20},
                                                    {text: 30},
                                                    {text: 40},
                                                    {text: 50},
                                                    {text: 60}
                                                ],
                                                listeners: {
                                                    scope: me,
                                                    click: function(menu, item){
                                                        this.nodeSpacing = parseInt(item.text);
                                                        this.fireEvent('changeitemspace', this, this.nodeSpacing);
                                                    }
                                                }
                                            }
                                        },
                                    ]
                                }
                            },
                            "-",
                            {
                                xtype: 'checkbox',
                                labelWidth: 60,
                                fieldLabel: 'Show Root',
                                checked: me.rootVisible,
                                scope: me,
                                handler: function(chk, value){
                                    this.rootVisible = value;
                                    this.fireEvent('changerootvisible', this, value)
                                }
                            },
                            " ",
                            {
                                xtype: 'checkbox',
                                labelWidth: 110,
                                fieldLabel: 'Allow Container Drop',
                                scope: me,
                                checked: me.allowContainerDrop,
                                handler: function(chk, value){
                                    this.allowContainerDrop = value;
                                    this.fireEvent('changecontainerdrop', this, value)
                                }
                            },
                            " ",
                            {
                                xtype: 'checkbox',
                                labelWidth: 70,
                                fieldLabel: 'Enable Tools',
                                scope: me,
                                checked: me.toolsVisible,
                                handler: function(chk, value){
                                    this.toolsVisible = value;
                                    this.fireEvent('changetools', this, value)
                                }
                            },
                            " ",
                            {
                                xtype: 'checkbox',
                                labelWidth: 60,
                                fieldLabel: 'Read Only',
                                checked: me.readOnly,
                                scope: me,
                                handler: function(chk, value){
                                    this.readOnly = value;
                                    this.fireEvent('changereadonly', this, value)
                                }
                            }
                        ]
                    }
                }
            ]
        });
        me.callParent( arguments );
    }
} );

Ext.onReady( function(){
    //there's a bug on auto scroll in version 4.2.1
    if(Ext.versions.extjs.equals( '4.2.1' )){
        Ext.define( 'Ext.dom.Element_ochart_scroll', {
            override: 'Ext.dom.Element',

            scroll: function( direction, distance, animate ){
                if( !this.isScrollable() ){
                    return false;
                }
                var me = this,
                    dom = me.dom,
                    dir,
                    side,
                    scrolled = false,
                    currentScroll, constrainedScroll;

                switch( direction ){
                    case 'r':
                    case 'right':
                        dir = 'r';
                        break;
                    case 'l':
                    case 'left':
                        dir = 'l';
                        break;
                    case 't':
                    case 'top':
                    case 'up':
                        dir = 't';
                        break;
                    case 'b':
                    case 'bottom':
                    case 'down':
                        dir = 'b';
                        break;
                }

                side = dir === 'r' || dir === 'l' ? 'left' : 'top';

                if( dir === 'r' || dir === 't' ){
                    distance = -distance;
                }

                if( side === 'left' ){
                    currentScroll = dom.scrollLeft;
                    constrainedScroll = me.constrainScrollLeft( currentScroll + distance );
                }
                else{
                    currentScroll = dom.scrollTop;
                    constrainedScroll = me.constrainScrollTop( currentScroll + distance );
                }

                if( constrainedScroll !== currentScroll ){
                    this.scrollTo( side, constrainedScroll, animate );
                    scrolled = true;
                }

                return scrolled;
            }
        } );
    }

    Ext.tip.QuickTipManager.init();
    Ext.create('OViewport');
});
