export default function Topic({topics}) {
    return (
      <div>
        {topics.id} {topics.title} {topics.description}
      </div>
    )
  };