import Util from '../util';

const serviceNameAnchor = '$$serviceName';
const repositoryNameAnchor = '$$repositoyName';

const serviceNameDepAnchor = '$$serviceNameDep';
const repositoryNameDepAnchor = '$$repositoyNameDep';

const componentNameAnchor = '$$componentName';
const template = `
import $$serviceName from '../service/$$serviceNameDep.js'
import $$repositoyName from '../repository/$$repositoyNameDep.js'

export default class $$componentNameFactory {
  static getInstance() {
    const repository = new $$repositoyName()
    const service = new $$serviceName({repository})
    return service
  }
}`;

export function factoryTemplate(componentName, repositoryName, serviceName) {
	const textFile = template
		.replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))

		.replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName))
		.replaceAll(
			repositoryNameDepAnchor,
			Util.lowerCaseFirstLetter(repositoryName)
		)

		.replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
		.replaceAll(
			repositoryNameAnchor,
			Util.upperCaseFirstLetter(repositoryName)
		);

	return {
		fileName: `${componentName}Factory`,
		template: textFile,
	};
}
