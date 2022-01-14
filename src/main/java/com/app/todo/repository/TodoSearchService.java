package com.app.todo.repository;

import com.app.todo.dto.TodoFilters;
import com.app.todo.model.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

@Service
public class TodoSearchService {

    @Autowired
    protected TodoRepository todoRepository;

    @Autowired
    protected EntityManager entityManager;

    private Collection<Predicate> addPredicates(TodoFilters todoFilters, CriteriaBuilder cb, Root root) {

        Collection<Predicate> predicates = new LinkedList<>();

        if (!StringUtils.isEmptyOrWhitespace(todoFilters.getTitle())) {
            String like = "%" + todoFilters.getTitle().toLowerCase() + "%";
            predicates.add(cb.like(cb.lower(root.get("title")), like));
        }

        if (!StringUtils.isEmptyOrWhitespace(todoFilters.getDescription())) {
            String like = "%" + todoFilters.getDescription().toLowerCase() + "%";
            predicates.add(cb.like(cb.lower(root.get("description")), like));
        }

        if (!CollectionUtils.isEmpty(todoFilters.getPriority())) {
            predicates.add(root.get("priority").in(todoFilters.getPriority()));
        }

        if (todoFilters.getStartCreationTime() != null) {
            predicates.add(cb.greaterThanOrEqualTo(root.get("creationTime"), todoFilters.getStartCreationTime()));
        }

        if (todoFilters.getEndCreationTime() != null) {
            predicates.add(cb.lessThanOrEqualTo(root.get("creationTime"), todoFilters.getEndCreationTime()));
        }

        predicates.add(cb.equal(root.get("scheduled"), todoFilters.isSchedule()));

        if (todoFilters.isSchedule()) {
            if (todoFilters.getStartTime() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("startTime"), todoFilters.getStartTime()));
            }

            if (todoFilters.getEndTime() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("endTime"), todoFilters.getEndTime()));
            }
        }

        if (todoFilters.getDone() != null) {
            predicates.add(cb.equal(root.get("done"), todoFilters.getDone()));
        }

        return predicates;
    }

    public Long countTodos(TodoFilters todoFilters) {

        CriteriaBuilder cb = this.entityManager.getCriteriaBuilder();

        CriteriaQuery<Long> cq = cb.createQuery(Long.class);

        Root<Todo> root = cq.from(Todo.class);

        Collection<Predicate> predicates = this.addPredicates(todoFilters, cb, root);

        cq.select(cb.countDistinct(root));

        cq.where(predicates.toArray(Predicate[]::new));

        Long count = (Long) this.entityManager.createQuery(cq).getSingleResult();

        return count;
    }

    public List<Todo> getTodos(TodoFilters todoFilters) {

        CriteriaBuilder cb = this.entityManager.getCriteriaBuilder();

        CriteriaQuery<Todo> cq = cb.createQuery(Todo.class);

        Root<Todo> root = cq.from(Todo.class);

        Collection<Predicate> predicates = this.addPredicates(todoFilters, cb, root);

        cq.select(root).where(predicates.toArray(Predicate[]::new));

        cq.distinct(true);
        if (todoFilters.isSchedule()) {
            //si on recherche les taches programmées on trie par date de demarrrage croissante
            cq.orderBy(cb.asc(root.get("startTime")));
        } else {
            //si on recherche les taches non programmées on trie par priorité decroissante
            cq.orderBy(cb.desc(root.get("priorityOrdinal")));
        }

        TypedQuery<Todo> q = this.entityManager.createQuery(cq);

        if (todoFilters.getPage() != null && todoFilters.getPageSize() != null) {

            Integer page = todoFilters.getPage() < 1 ? 1 : todoFilters.getPage();

            Integer pageSize = todoFilters.getPageSize() < 1 ? 1 : todoFilters.getPageSize();

            q.setFirstResult(page - 1).setMaxResults(pageSize);
        }


        return q.getResultList();
    }

}
