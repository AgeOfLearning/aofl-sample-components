import {html} from '@polymer/lit-element';
import {render} from 'lit-html';
import {routerInstance} from '@aofl/router';
import '../';

describe('link-to', function() {
  let element;
  let stub;
  let fireEvent;

  before(function() {
    fireEvent = (el, etype) => {
      if (el.fireEvent) {
        el.fireEvent('on' + etype);
      } else {
        let evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    };
  });

  before(function() {
    render(html`
      <test-fixture id="BasicTestFixture">
        <template>
          <link-to href="/login"></link-to>
        </template>
      </test-fixture>
    `, document.getElementById('test-container'));
    element = fixture('BasicTestFixture');

    stub = sinon.stub(routerInstance, 'navigate');
  });
  it('Should render', function() {
    expect(element.shadowRoot).to.not.equal(null);
    expect(element.href).to.equal('/login');
  });

  it('Should call router navigate when clicked', function() {
    fireEvent(element.shadowRoot.children[1], 'click');
    expect(routerInstance.navigate.called).to.equal(true);
  });

  after(function() {
    stub.restore();
  });
});
