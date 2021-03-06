/**
* @jest-environment node
*/
/**
 * (C) Copyright IBM Corp. 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const ResourceControllerV2 = require('../dist/resource-controller/v2');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../test/resources/auth-helper.js');

//
// This file provides an example of how to use the Resource Controller service.
//
// The following configuration properties are assumed to be defined:
//
// RESOURCE_CONTROLLER_URL=<service url>
// RESOURCE_CONTROLLER_AUTH_TYPE=iam
// RESOURCE_CONTROLLER_AUTH_URL=<IAM Token Service url>
// RESOURCE_CONTROLLER_APIKEY=<User's IAM API Key>
// RESOURCE_CONTROLLER_RESOURCE_GROUP=<Short ID of the user's resource group>
// RESOURCE_CONTROLLER_PLAN_ID=<Unique ID of the plan associated with the offering>
// RESOURCE_CONTROLLER_ACCOUNT_ID=<User's account ID>
// RESOURCE_CONTROLLER_ALIAS_TARGET_CRN=<The CRN of target name(space) in a specific environment>
// RESOURCE_CONTROLLER_BINDING_TARGET_CRN=<The CRN of application to bind to in a specific environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = 'resource_controller.env';

const describe = authHelper.prepareTests(configFile);

// Save original console.log and console.warn
const originalLog = console.log
const originalWarn = console.warn

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('ResourceControllerV2', () => {
  jest.setTimeout(30000);

  // begin-common

  const resourceControllerService = ResourceControllerV2.newInstance({});

  // end-common

  const config = readExternalSources(ResourceControllerV2.DEFAULT_SERVICE_NAME);

  let instanceGuid = null;
  let aliasGuid = null;
  let bindingGuid = null;
  let instanceKeyGuid = null;
  let reclamationId = null;
  let resourceGroupGuid = config.resourceGroup; 
  let resourcePlanId = config.reclamationPlanId; 
  let accountId = config.accountId;
  let aliasTargetCRN = config.aliasTargetCrn;
  let bindingTargetCRN = config.bindingTargetCrn;
  let resourceInstanceName = 'RcSdkInstance1Node';
  let resourceInstanceUpdateName = 'RcSdkInstanceUpdate1Node';
  let aliasName = 'RcSdkAlias1Node';
  let aliasUpdateName = 'RcSdkAliasUpdate1Node';
  let bindingName = 'RcSdkBinding1Node';
  let bindingUpdateName = 'RcSdkBindingUpdate1Node';
  let keyName = 'RcSdkKey1Node';
  let keyUpdateName = 'RcSdkKeyUpdate1Node';
  let targetRegion = 'global';
  let reclaimAction = 'reclaim';

  test('createResourceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-create_resource_instance

    const params = {
      name: resourceInstanceName,
      target: targetRegion,
      resourceGroup: resourceGroupGuid,
      resourcePlanId: resourcePlanId,
    };

    resourceControllerService.createResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        instanceGuid = res.result.guid;
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_resource_instance
  });
  test('getResourceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_resource_instance

    const params = {
      id: instanceGuid,
    };

    resourceControllerService.getResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_resource_instance
  });
  test('updateResourceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_resource_instance

    const instancePars = {
      'example': 'property',
    };

    const params = {
      id: instanceGuid,
      name: resourceInstanceUpdateName,
      parameters: instancePars,
    };

    resourceControllerService.updateResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_resource_instance
  });
  test('listResourceInstances request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_resource_instances

    const params = {
      name: resourceInstanceName,
    };

    resourceControllerService.listResourceInstances(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_resource_instances
  });
  test('createResourceAlias request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-create_resource_alias

    const params = {
      name: aliasName,
      source: instanceGuid,
      target: aliasTargetCRN,
    };

    resourceControllerService.createResourceAlias(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        aliasGuid = res.result.guid;
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_resource_alias
  });
  test('getResourceAlias request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_resource_alias

    const params = {
      id: aliasGuid,
    };

    resourceControllerService.getResourceAlias(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_resource_alias
  });
  test('updateResourceAlias request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_resource_alias

    const params = {
      id: aliasGuid,
      name: aliasUpdateName,
    };

    resourceControllerService.updateResourceAlias(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_resource_alias
  });
  test('listResourceAliases request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_resource_aliases

    const params = {
      name: aliasName,
    };

    resourceControllerService.listResourceAliases(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_resource_aliases
  });
  test('createResourceBinding request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-create_resource_binding

    const params = {
      name: bindingName,
      source: aliasGuid,
      target: bindingTargetCRN,
    };

    resourceControllerService.createResourceBinding(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        bindingGuid = res.result.guid;
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_resource_binding
  });
  test('getResourceBinding request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_resource_binding

    const params = {
      id: bindingGuid,
    };

    resourceControllerService.getResourceBinding(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_resource_binding
  });
  test('updateResourceBinding request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_resource_binding

    const params = {
      id: bindingGuid,
      name: bindingUpdateName,
    };

    resourceControllerService.updateResourceBinding(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_resource_binding
  });
  test('listResourceBindings request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_resource_bindings

    const params = {
      name: bindingName,
    };

    resourceControllerService.listResourceBindings(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_resource_bindings
  });
  test('createResourceKey request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-create_resource_key

    const params = {
      name: keyName,
      source: instanceGuid,
    };

    resourceControllerService.createResourceKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        instanceKeyGuid = res.result.guid;
      })
      .catch(err => {
        console.warn(err)
      });

    // end-create_resource_key
  });
  test('getResourceKey request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-get_resource_key

    const params = {
      id: instanceKeyGuid,
    };

    resourceControllerService.getResourceKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-get_resource_key
  });
  test('updateResourceKey request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-update_resource_key

    const params = {
      id: instanceKeyGuid,
      name: keyUpdateName,
    };

    resourceControllerService.updateResourceKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-update_resource_key
  });
  test('listResourceKeys request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-list_resource_keys

    const params = {
      name: keyName,
    };

    resourceControllerService.listResourceKeys(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_resource_keys
  });
  test('deleteResourceBinding request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_resource_binding

    const params = {
      id: bindingGuid,
    };

    resourceControllerService.deleteResourceBinding(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_resource_binding
  });
  test('deleteResourceKey request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_resource_key

    const params = {
      id: instanceKeyGuid,
    };

    resourceControllerService.deleteResourceKey(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_resource_key
  });
  test('deleteResourceAlias request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_resource_alias

    const params = {
      id: aliasGuid,
    };

    resourceControllerService.deleteResourceAlias(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_resource_alias
  });
  test('lockResourceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-lock_resource_instance

    const params = {
      id: instanceGuid,
    };

    resourceControllerService.lockResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-lock_resource_instance
  });
  test('unlockResourceInstance request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-unlock_resource_instance

    const params = {
      id: instanceGuid,
    };

    resourceControllerService.unlockResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-unlock_resource_instance
  });
  test('deleteResourceInstance request example', async done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-delete_resource_instance

    const params = {
      id: instanceGuid,
    };

    resourceControllerService.deleteResourceInstance(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-delete_resource_instance
    await new Promise(resolve => setTimeout(resolve, 20000));
  });
  test('listReclamations request example', async done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });
    await new Promise(resolve => setTimeout(resolve, 20000));

    // begin-list_reclamations

    const params = {
      accountId: accountId,
    };

    resourceControllerService.listReclamations(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
        var resources = res.result.resources;
        resources.forEach( reclaim => {
          if (reclaim.resource_instance_id.toString() === instanceGuid){
            reclamationId = reclaim.id;
          }
        });
      })
      .catch(err => {
        console.warn(err)
      });

    // end-list_reclamations
  });
  test('runReclamationAction request example', done => {

    consoleLogMock.mockImplementation(output => {
      done();
    });
    consoleWarnMock.mockImplementation(output => {
      done(output);
    });

    // begin-run_reclamation_action

    const params = {
      id: reclamationId,
      actionName: reclaimAction,
    };

    resourceControllerService.runReclamationAction(params)
      .then(res => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch(err => {
        console.warn(err)
      });

    // end-run_reclamation_action
  });
});
