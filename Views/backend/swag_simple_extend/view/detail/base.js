//{block name="backend/article/view/detail/base"}
//{$smarty.block.parent}
Ext.define('Shopware.apps.Article.view.detail.MyBase', {
    override: 'Shopware.apps.Article.view.detail.Base',

    createRightElements: function() {
        var me = this,
            elements = me.callParent(arguments);

        me.attrField = Ext.create('Ext.form.field.Text', {
            xtype: 'textfield',
            name: 'my_column',
            labelWidth: 155,
            fieldLabel: 'My custom field'
        });

        elements.push(me.attrField);

        return elements;
    },

    onStoresLoaded: function() {
        var me = this;

        me.callParent(arguments);

        Ext.Ajax.request({
            url: '{url controller=AttributeData action=loadData}',
            params: {
                _foreignKey: me.article.get('mainDetailId'),
                _table: 's_articles_attributes'
            },
            success: function(responseData, request) {
                var response = Ext.JSON.decode(responseData.responseText);

                me.attrField.setValue(response.data['__attribute_my_column']);
            }
        });
    }
});
//{/block}