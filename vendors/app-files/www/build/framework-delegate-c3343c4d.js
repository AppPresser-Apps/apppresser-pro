import { c as componentOnReady } from './helpers-6885e51a.js';

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
// TODO(FW-2832): types
const attachComponent = async (delegate, container, component, cssClasses, componentProps, inline) => {
  var _a;
  if (delegate) {
    return delegate.attachViewToDom(container, component, componentProps, cssClasses);
  }
  if (!inline && typeof component !== 'string' && !(component instanceof HTMLElement)) {
    throw new Error('framework delegate is missing');
  }
  const el = typeof component === 'string' ? (_a = container.ownerDocument) === null || _a === void 0 ? void 0 : _a.createElement(component) : component;
  if (cssClasses) {
    cssClasses.forEach((c) => el.classList.add(c));
  }
  if (componentProps) {
    Object.assign(el, componentProps);
  }
  container.appendChild(el);
  await new Promise((resolve) => componentOnReady(el, resolve));
  return el;
};
const detachComponent = (delegate, element) => {
  if (element) {
    if (delegate) {
      const container = element.parentElement;
      return delegate.removeViewFromDom(container, element);
    }
    element.remove();
  }
  return Promise.resolve();
};
const CoreDelegate = () => {
  let BaseComponent;
  let Reference;
  const attachViewToDom = async (parentElement, userComponent, userComponentProps = {}, cssClasses = []) => {
    var _a, _b;
    BaseComponent = parentElement;
    /**
     * If passing in a component via the `component` props
     * we need to append it inside of our overlay component.
     */
    if (userComponent) {
      /**
       * If passing in the tag name, create
       * the element otherwise just get a reference
       * to the component.
       */
      const el = typeof userComponent === 'string' ? (_a = BaseComponent.ownerDocument) === null || _a === void 0 ? void 0 : _a.createElement(userComponent) : userComponent;
      /**
       * Add any css classes passed in
       * via the cssClasses prop on the overlay.
       */
      cssClasses.forEach((c) => el.classList.add(c));
      /**
       * Add any props passed in
       * via the componentProps prop on the overlay.
       */
      Object.assign(el, userComponentProps);
      /**
       * Finally, append the component
       * inside of the overlay component.
       */
      BaseComponent.appendChild(el);
      await new Promise((resolve) => componentOnReady(el, resolve));
    }
    else if (BaseComponent.children.length > 0 &&
      (BaseComponent.tagName === 'ION-MODAL' || BaseComponent.tagName === 'ION-POPOVER')) {
      /**
       * The delegate host wrapper el is only needed for modals and popovers
       * because they allow the dev to provide custom content to the overlay.
       */
      const root = BaseComponent.children[0];
      if (!root.classList.contains('ion-delegate-host')) {
        /**
         * If the root element is not a delegate host, it means
         * that the overlay has not been presented yet and we need
         * to create the containing element with the specified classes.
         */
        const el = (_b = BaseComponent.ownerDocument) === null || _b === void 0 ? void 0 : _b.createElement('div');
        // Add a class to track if the root element was created by the delegate.
        el.classList.add('ion-delegate-host');
        cssClasses.forEach((c) => el.classList.add(c));
        // Move each child from the original template to the new parent element.
        el.append(...BaseComponent.children);
        // Append the new parent element to the original parent element.
        BaseComponent.appendChild(el);
      }
    }
    /**
     * Get the root of the app and
     * add the overlay there.
     */
    const app = document.querySelector('ion-app') || document.body;
    /**
     * Create a placeholder comment so that
     * we can return this component to where
     * it was previously.
     */
    Reference = document.createComment('ionic teleport');
    BaseComponent.parentNode.insertBefore(Reference, BaseComponent);
    app.appendChild(BaseComponent);
    return BaseComponent;
  };
  const removeViewFromDom = () => {
    /**
     * Return component to where it was previously in the DOM.
     */
    if (BaseComponent && Reference) {
      Reference.parentNode.insertBefore(BaseComponent, Reference);
      Reference.remove();
    }
    return Promise.resolve();
  };
  return { attachViewToDom, removeViewFromDom };
};

export { CoreDelegate as C, attachComponent as a, detachComponent as d };
