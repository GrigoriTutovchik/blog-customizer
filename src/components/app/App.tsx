import clsx from 'clsx';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState, ArticleStateType } from 'src/constants/articleProps';
import { CSSProperties, useState } from 'react';
import styles from '/src/styles/index.module.scss';

export const App = () => {
  const [appState, setAppState] = useState<ArticleStateType>(defaultArticleState);

	const onChange = (proprs: ArticleStateType) => {
		setAppState(proprs)
	}
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={onChange}/>
			<Article />
		</main>
	);
};