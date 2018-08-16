import {html} from '@polymer/lit-element';
import {render} from 'lit-html';
import {routerInstance} from '@aofl/router';
import '../';

const pageElem = 'div';
describe('route-view', function() {
  let viewElement;
  const mws = [];
  before(function() {
    const response = {
      matchedRoute: {
        resolve() {
          return Promise.resolve({
            default: {
              is: pageElem
            }
          });
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
    render(html`
      <test-fixture id="ViewTestFixture">
        <template>
          <route-view></route-view>
        </template>
      </test-fixture>
    `, document.getElementById('test-container'));
    viewElement = fixture('ViewTestFixture');
    viewElement.init(routerInstance);
  });

  it('Should render', function() {
    expect(viewElement.shadowRoot).to.not.equal(null);
  });

  it('Should register router middleware and navigate', function(done) {
    routerInstance.navigate('/');
    viewElement.renderComplete.then(() => {
      expect(mws.every((mw) => typeof mw.args[0] === 'object')).to.equal(true);
      expect(viewElement.shadowRoot.children[1].localName).to.equal(pageElem);
      done();
    });
  });
});
