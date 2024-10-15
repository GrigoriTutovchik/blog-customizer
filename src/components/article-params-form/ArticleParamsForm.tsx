import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect, FormEvent } from 'react';

import { 
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
	OptionType
} from 'src/constants/articleProps';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticlePropsForm = {
	onChange: (option: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticlePropsForm) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formOptions, setFormOptions] =
	useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		const handleClick = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(!isOpen);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, formRef]);

  const handleClickArrow = () => {
    setIsOpen(!isOpen);
  };

	const changeForm = (optionName: string) => {
		return (option: OptionType) => {
			setFormOptions((currentFormState) => ({...currentFormState, [optionName]: option}));
		}
	}

	const handleFormReset = () => {
		setFormOptions(defaultArticleState);
		props.onChange(defaultArticleState);
	}

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		props.onChange(formOptions);
	};

  return (
    <>
     <ArrowButton isOpen={isOpen} onClick={handleClickArrow} />
      <aside 
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
					<Text weight={800} size={31} uppercase>
						задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={formOptions.fontFamilyOption}
						onChange={changeForm('fontFamilyOption')}
					/>
					<RadioGroup 
						selected={formOptions.fontSizeOption} 
						name={'fontSize'} 
						options={fontSizeOptions} 
						title={'Размер шрифта'} 
						onChange={changeForm('fontSizeOption')}
					/>
					<Select
						selected={formOptions.fontColor}
						options={fontColors}
						title={'цвет шрифта'}
						onChange={changeForm('fontColor')}
					/>
					<Separator />
					<Select selected={formOptions.backgroundColor} 
					options={backgroundColors} 
					title='цвет фона' 
					onChange={changeForm('backgroundColor')}/>
				
					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={formOptions.contentWidth}
						onChange={changeForm('contentWidth')}
					/>
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' onClick={handleFormReset}/>
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};