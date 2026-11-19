import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { useEffect, useRef, useState } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import type { FormEvent } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isParamsFormOpen, setIsParamsFormOpen] = useState(false);
  const [draft, setDraft] = useState<ArticleStateType>(defaultArticleState);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isParamsFormOpen) return;

    const handleOutsideClick = (e: MouseEvent): void => {
      if (e.target instanceof Node && !rootRef.current?.contains(e.target)) {
        setIsParamsFormOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isParamsFormOpen]);

  const asideClass = isParamsFormOpen
    ? `${styles.container} 
  ${styles.container_open}`
    : styles.container;

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    onApply(draft);
  };

  const handleReset = (e: FormEvent): void => {
    e.preventDefault();
    setDraft(defaultArticleState);
    onApply(defaultArticleState);
  };
  return (
    <div ref={rootRef}>
      <ArrowButton
        isOpen={isParamsFormOpen}
        onClick={() => setIsParamsFormOpen((isOpen) => !isOpen)}
      />
      <aside className={asideClass}>
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text size={31} as={'h2'} weight={800} uppercase={true}>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={draft.fontFamilyOption}
            onChange={(option) => setDraft({ ...draft, fontFamilyOption: option })}
          />
          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={draft.fontSizeOption}
            onChange={(option) => setDraft({ ...draft, fontSizeOption: option })}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={draft.fontColor}
            onChange={(option) => setDraft({ ...draft, fontColor: option })}
          />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={draft.backgroundColor}
            onChange={(option) => setDraft({ ...draft, backgroundColor: option })}
          />
          <Separator />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={draft.contentWidth}
            onChange={(option) => setDraft({ ...draft, contentWidth: option })}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
