<?php

class Shopware_Plugins_Backend_SwagSimpleExtend_Bootstrap extends Shopware_Components_Plugin_Bootstrap
{
    public function install()
    {
        $this->subscribeEvent(
            'Enlight_Controller_Action_PostDispatchSecure_Backend_Article',
            'onArticlePostDispatch'
        );

        return true;
    }

    public function onArticlePostDispatch(Enlight_Event_EventArgs $args)
    {
        /** @var \Enlight_Controller_Action $controller */
        $controller = $args->getSubject();
        $view = $controller->View();
        $request = $controller->Request();

        $view->addTemplateDir(__DIR__ . '/Views');

        if ($request->getActionName() == 'load') {
            $view->extendsTemplate('backend/swag_simple_extend/view/detail/base.js');
        }
    }
}