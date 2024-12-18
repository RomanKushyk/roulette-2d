declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-assets': Record<string, any>;
      'a-asset-item': Record<string, any>;
      'a-scene': Record<string, any>;
      'a-camera': Record<string, any>;
      'a-entity': Record<string, any>;
      'a-light': Record<string, any>;
      'a-sky': Record<string, any>;
      'a-box': Record<string, any>;
      'a-circle': Record<string, any>;
      'a-cone': Record<string, any>;
      'a-cylinder': Record<string, any>;
      'a-dodecahedron': Record<string, any>;
      'a-cubemap': Record<string, any>;
    }

    interface HTMLElementTagNameMap {
      'a-assets': HTMLElement;
      'a-asset-item': HTMLElement;
      'a-scene': HTMLElement;
      'a-camera': HTMLElement;
      'a-entity': HTMLElement;
      'a-light': HTMLElement;
      'a-sky': HTMLElement;
      'a-box': HTMLElement;
      'a-circle': HTMLElement;
      'a-cone': HTMLElement;
      'a-cylinder': HTMLElement;
      'a-dodecahedron': HTMLElement;
      'a-cubemap': HTMLElement;
    }
  }
}

export {};
