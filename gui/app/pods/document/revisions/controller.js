// Copyright 2016 Documize Inc. <legal@documize.com>. All rights reserved.
//
// This software (Documize Community Edition) is licensed under
// GNU AGPL v3 http://www.gnu.org/licenses/agpl-3.0.en.html
//
// You can operate outside the AGPL restrictions by purchasing
// Documize Enterprise Edition and obtaining a commercial license
// by contacting <sales@documize.com>.
//
// https://documize.com

import { inject as service } from '@ember/service';
import Notifier from '../../../mixins/notifier';
import Controller from '@ember/controller';

export default Controller.extend(Notifier, {
	documentService: service('document'),
	router: service(),
	selectedRevision: null,

	actions: {
		onRevision(revision) {
			this.set('selectedRevision', revision);
		},

		onRollback(pageId, revisionId) {
			this.get('documentService').rollbackPage(this.get('document.id'), pageId, revisionId).then(() => {
				this.notifySuccess('Reverted to selected revision');
				this.get('router').transitionTo('document.index');
			});
		}
	}
});
