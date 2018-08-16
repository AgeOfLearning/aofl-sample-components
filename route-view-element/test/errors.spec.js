import {html} from '@polymer/lit-element';
import {render} from 'lit-html';
import {routerInstance} from '@aofl/router';
import '../';

describe('route-view ERROR', function() {
  let viewElement;
  const mws = [];
  before(function() {
    const response = {
      matchedRoute: {
        resolve() {
          return Promise.reject('rejected');
        }
      }
    };
    sinon.stub(routerInstance, 'after', (fn) => {
      mws.push(sinon.spy(fn));
    });
    sinon.stub(routerInstance, 'navigate', () => {
      mws.forEach((mw) => mw(response, response, ()=>{}));
    });
  });
  before(function() {
    const testContainer = document.getElementById('test-container');
    testContainer.innerHTML = '';
    render(html`
      <test-fixture id="ViewErrorTestFixture">
        <template>
          <route-view></route-view>
        </template>
      </test-fixture>
    `, testContainer);
    viewElement = fixture('ViewErrorTestFixture');
    viewElement.init(routerInstance);
  });

  it('Should render', function() {
    expect(viewElement.shadowRoot).to.not.equal(null);
  });

  it('Should register router middleware and navigate', function(done) {
    routerInstance.after(() => {
      setTimeout(() => {
        expect(viewElement.shadowRoot.children[1].localName).to.equal('p');
        done();
      }, 50);
    });
    routerInstance.navigate('/');
  });
});
